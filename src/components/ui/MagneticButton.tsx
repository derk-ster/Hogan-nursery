"use client";

import {
  forwardRef,
  useRef,
  useCallback,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "ghost";

type BaseProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  wrapClassName?: string;
  magnetic?: boolean;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const variantClass: Record<Variant, string> = {
  primary:
    "bg-olive text-cream shadow-cta-glow hover:bg-olive-dark border border-olive/80",
  secondary:
    "border-2 border-clay bg-cream text-terracotta hover:bg-sand",
  ghost:
    "border border-brown/25 bg-tan text-charcoal hover:border-clay hover:bg-sand",
};

function useMagneticHandlers(
  magnetic: boolean,
  wrapRef: React.RefObject<HTMLElement | null>,
  controlRef: React.RefObject<HTMLElement | null>
) {
  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (!magnetic) return;
      const wrap = wrapRef.current;
      const control = controlRef.current;
      if (!wrap || !control) return;
      const rect = wrap.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const dx = (x - 50) * 0.12;
      const dy = (y - 50) * 0.12;
      wrap.style.setProperty("--glow-x", `${x}%`);
      wrap.style.setProperty("--glow-y", `${y}%`);
      control.style.setProperty("--magnet-x", `${dx}px`);
      control.style.setProperty("--magnet-y", `${dy}px`);
    },
    [magnetic, wrapRef, controlRef]
  );

  const handleLeave = useCallback(() => {
    const wrap = wrapRef.current;
    const control = controlRef.current;
    if (!wrap || !control) return;
    wrap.style.setProperty("--glow-x", "50%");
    wrap.style.setProperty("--glow-y", "50%");
    control.style.setProperty("--magnet-x", "0px");
    control.style.setProperty("--magnet-y", "0px");
  }, [wrapRef, controlRef]);

  return { handleMove, handleLeave };
}

export const MagneticButton = forwardRef<
  HTMLButtonElement,
  ButtonProps | LinkProps
>(function MagneticButton(props, forwardedRef) {
  const {
    variant = "primary",
    children,
    className = "",
    wrapClassName = "",
    magnetic = true,
    ...rest
  } = props;

  const wrapRef = useRef<HTMLSpanElement>(null);
  const controlRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const { handleMove, handleLeave } = useMagneticHandlers(
    magnetic,
    wrapRef,
    controlRef
  );

  const setRef = (node: HTMLButtonElement & HTMLAnchorElement | null) => {
    controlRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  const wrapClass = `magnetic-btn-wrap magnetic-btn-wrap-${variant} ${wrapClassName}`;
  const classes = `magnetic-btn magnetic-btn-${variant} ${variantClass[variant]} ${className}`;

  const controlContent = (
    <>
      <span className="magnetic-btn-shine" aria-hidden />
      <span className="magnetic-btn-label">{children}</span>
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as LinkProps;
    return (
      <span
        ref={wrapRef}
        className={wrapClass}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <span
          className={`magnetic-btn-underglow magnetic-btn-underglow-${variant}`}
          aria-hidden
        />
        <a
          ref={setRef as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...linkRest}
        >
          {controlContent}
        </a>
      </span>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <span
      ref={wrapRef}
      className={wrapClass}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <span
        className={`magnetic-btn-underglow magnetic-btn-underglow-${variant}`}
        aria-hidden
      />
      <button
        ref={setRef}
        type={buttonRest.type ?? "button"}
        className={classes}
        {...buttonRest}
      >
        {controlContent}
      </button>
    </span>
  );
});

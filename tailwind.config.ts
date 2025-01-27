import plugin from 'tailwindcss/plugin';

const status = ['error', 'info', 'success', 'warning'];
const variants = ['primary', 'secondary', ...status],
  weights = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    'A100',
    'A200',
    'A400',
    'A700',
  ],
  typographies = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'button',
    'caption',
    'overline',
  ],
  states = ['active', 'disabled', 'focus', 'hover', 'selected'];

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  important: '#__next',
  darkMode: 'selector',
  corePlugins: {
    /**
     * @copyright {@link https://github.com/amelioro/ameliorate/blob/main/tailwind.config.js}
     * MUI says to set tailwind preflight to false because it can break things @see{@link https://mui.com/material-ui/integrations/interoperability/#tailwind-css}
     * but some tailwind styles are awkward without it, e.g. using dividers {@link https://tailwindcss.com/docs/divide-width} requires that you also have border-style set (with the preflight, border-style defaults to solid).
     * Going to comment it out for now to get the benefit of tailwind's preflight, but if there are
     * issues with both preflights, we can set it back to false and do something like this{@link https://github.com/tailwindlabs/tailwindcss/discussions/11290#discussioncomment-7783598}.
     * preflight: false, // MUI already adds a preflight (CssBaseline)
     */
  },
  theme: {
    // @see {@link https://mui-treasury.com/?path=/docs/tailwind-preset--docs }
    extend: {
      screens: {
        sm: '600px',
        md: '900px',
        lg: '1200px',
        xl: '1536px',
        '2xl': '1920px',
      },
      colors: {
        ...variants.reduce(
          (acc, variant) => ({
            ...acc,
            [variant]: {
              DEFAULT: `rgb(var(--mui-palette-${variant}-mainChannel))`,
              light: `rgb(var(--mui-palette-${variant}-lightChannel))`,
              dark: `rgb(var(--mui-palette-${variant}-darkChannel))`,
              contrastText: `rgb(var(--mui-palette-${variant}-contrastTextChannel))`,
            },
          }),
          {},
        ),
        text: {
          primary: 'var(--mui-palette-text-primary)',
          secondary: 'var(--mui-palette-text-secondary)',
          disabled: 'var(--mui-palette-text-disabled)',
        },
        common: {
          background: 'var(--mui-palette-common-background)',
          onBackground: 'var(--mui-palette-common-onBackground)',
        },
        gray: weights.reduce(
          (acc, weight) => ({ ...acc, [weight]: `var(--mui-palette-grey-${weight})` }),
          {},
        ),
        divider: 'var(--mui-palette-divider)',
        background: {
          DEFAULT: 'var(--mui-palette-background-default)',
          paper: 'var(--mui-palette-background-paper)',
        },
        action: states.reduce(
          (acc, state) => ({ ...acc, [state]: `var(--mui-palette-action-${state})` }),
          {},
        ),
        Alert: status.reduce(
          (acc, status) => ({
            ...acc,
            [`${status}Color`]: `var(--mui-palette-Alert-${status}Color)`,
            [`${status}FilledBg`]: `var(--mui-palette-Alert-${status}FilledBg)`,
            [`${status}FilledColor`]: `var(--mui-palette-Alert-${status}FilledColor)`,
            [`${status}StandardBg`]: `var(--mui-palette-Alert-${status}StandardBg)`,
            [`${status}IconColor`]: `var(--mui-palette-Alert-${status}IconColor)`,
          }),
          {},
        ),
        AppBar: {
          defaultBg: 'var(--mui-palette-AppBar-defaultBg)',
        },
        Avatar: {
          defaultBg: 'var(--mui-palette-Avatar-defaultBg)',
        },
        Button: {
          inheritContainedBg: 'var(--mui-palette-Button-inheritContainedBg)',
          inheritContainedHoverBg: 'var(--mui-palette-Button-inheritContainedHoverBg)',
        },
        Chip: {
          defaultBorder: 'var(--mui-palette-Chip-defaultBorder)',
          defaultAvatarColor: 'var(--mui-palette-Chip-defaultAvatarColor)',
          defaultIconColor: 'var(--mui-palette-Chip-defaultIconColor)',
        },
        FilledInput: {
          bg: 'var(--mui-palette-FilledInput-bg)',
          hoverBg: 'var(--mui-palette-FilledInput-hoverBg)',
          disabledBg: 'var(--mui-palette-FilledInput-disabledBg)',
        },
        LinearProgress: variants.reduce(
          (acc, variant) => ({
            ...acc,
            [`${variant}Bg`]: `var(--mui-palette-LinearProgress-${variant}Bg)`,
          }),
          {},
        ),
        Skeleton: {
          bg: 'var(--mui-palette-Skeleton-bg)',
        },
        Slider: variants.reduce(
          (acc, variant) => ({
            ...acc,
            [`${variant}TrackColor`]: `var(--mui-palette-Slider-${variant}Track)`,
          }),
          {},
        ),
        SnackbarContent: {
          bg: 'var(--mui-palette-SnackbarContent-bg)',
          color: 'var(--mui-palette-SnackbarContent-color)',
        },
        SpeedDialAction: {
          fabHoverBg: 'var(--mui-palette-SpeedDialAction-fabHoverBg)',
        },
        StepConnector: {
          border: 'var(--mui-palette-StepConnector-border)',
        },
        StepContent: {
          border: 'var(--mui-palette-StepContent-border)',
        },
        Switch: {
          defaultColor: 'var(--mui-palette-Switch-defaultColor)',
          defaultDisabledColor: 'var(--mui-palette-Switch-defaultDisabledColor)',
          ...variants.reduce(
            (acc, variant) => ({
              ...acc,
              [`${variant}DisabledColor`]: `var(--mui-palette-Switch-${variant}DisabledColor)`,
            }),
            {},
          ),
        },
        TableCell: {
          border: 'var(--mui-palette-TableCell-border)',
        },
        Tooltip: {
          bg: 'var(--mui-palette-Tooltip-bg)',
        },
      },
      borderRadius: {
        sm: 'calc(var(--mui-shape-borderRadius) / 2)',
        DEFAULT: 'var(--mui-shape-borderRadius)',
        lg: 'calc(var(--mui-shape-borderRadius) * 2)',
      },
      boxShadow: Array.from({ length: 24 }, (_, i) => `var(--mui-shadows-${++i})`),
      opacity: states.reduce(
        (acc, state) => ({ ...acc, [state]: `var(--mui-palette-action-${state}Opacity)` }),
        {},
      ),
      animation: {
        carousel: 'scrolls 60s linear infinite',
      },
      keyframes: {
        scrolls: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [
    plugin(utility => {
      utility.addBase({
        h1: { font: 'var(--mui-font-h1)', letterSpacing: '-0.01562em' },
        h2: { font: 'var(--mui-font-h2)', letterSpacing: '-0.00833em' },
        h3: { font: 'var(--mui-font-h3)' },
        h4: { font: 'var(--mui-font-h4)', letterSpacing: '0.00735em' },
        h5: { font: 'var(--mui-font-h5)' },
        h6: { font: 'var(--mui-font-h6)', letterSpacing: '0.0075em' },
        p: { font: 'var(--mui-font-body1)', letterSpacing: '0.00938em' },
        span: { font: 'var(--mui-font-body2)', letterSpacing: '0.01071em' },
      });

      utility.addUtilities({
        ...typographies.reduce(
          (acc, typography) => ({
            ...acc,
            [`.typography-${typography}`]: { font: `var(--mui-font-${typography})` },
          }),
          {},
        ),
        ...Array.from({ length: 24 }, (_, i) => ({
          [`.overlay-${i}`]: {
            backgroundImage: `var(--mui-overlays-${++i})`,
          },
        })),
        ...Array.from({ length: 24 }, (_, i) => ({
          [`.elevation-${i}`]: {
            backgroundImage: `var(--mui-overlays-${++i})`,
            boxShadow: `var(--mui-shadows-${i})`,
          },
        })),
      });
    }),
  ],
};

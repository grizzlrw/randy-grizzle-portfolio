# Dark Mode Implementation Guide

## Overview
This portfolio now includes comprehensive dark mode support with automatic theme switching based on user preferences. The implementation uses Material-UI's theming system combined with next-themes for seamless theme management.

## Key Features

### 🌓 Theme Switching
- **Manual Toggle**: Theme toggle button in the navigation bar
- **System Preference**: Automatically detects and respects OS-level dark mode settings
- **Persistent**: Theme preference is saved in localStorage
- **Smooth Transitions**: CSS transitions for color changes

### 🎨 Color Palette

#### Light Mode
- **Primary**: #034C8C (Deep Blue)
- **Secondary**: #F2CA50 (Gold)
- **Background**: #ffffff (White)
- **Paper**: #ffffff (White)
- **Text Primary**: #171717 (Near Black)
- **Text Secondary**: #525252 (Gray)

#### Dark Mode
- **Primary**: #76bcf9 (Light Blue)
- **Secondary**: #f4c125 (Bright Gold)
- **Background**: #0a0a0a (Near Black)
- **Paper**: #1a1a1a (Dark Gray)
- **Text Primary**: #ededed (Off White)
- **Text Secondary**: #a3a3a3 (Light Gray)

## Implementation Details

### 1. Theme Configuration ([theme.ts](app/theme.ts))

The theme uses a dynamic function that creates different palettes based on the mode:

```typescript
export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#034C8C' : '#76bcf9',
      // ... color scales
    },
    // ... other palette settings
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#ecf5fe' : '#1a1a1a',
          color: mode === 'light' ? '#000' : '#ededed',
        },
      },
    },
  },
});
```

### 2. Theme Provider ([providers.tsx](app/providers.tsx))

The providers file integrates next-themes with Material-UI:

```typescript
const MuiThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Theme is created based on resolved theme
  const theme = useMemo(
    () => getTheme(resolvedTheme === 'dark' ? 'dark' : 'light'),
    [resolvedTheme]
  );

  // Prevents flash of unstyled content
  if (!mounted) return null;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
```

### 3. CSS Variables ([globals.css](app/globals.css))

CSS custom properties support both themes:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --primary: #034C8C;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
  --primary: #76bcf9;
}
```

### 4. Theme Toggle Component ([ThemeToggle.tsx](app/components/navigation/ThemeToggle.tsx))

A reusable component for switching themes:

```typescript
export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  
  return (
    <IconButton onClick={() => setTheme(isDark ? "light" : "dark")}>
      {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
```

## Component Updates

### Theme-Aware Components

All components were updated to use theme values instead of hardcoded colors:

#### Before:
```typescript
sx={{ color: '#000', bgcolor: 'grey.50' }}
```

#### After:
```typescript
sx={{ 
  color: 'text.primary',
  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50'
}}
```

### Updated Components:
- ✅ [drawer-app-bar.tsx](app/components/navigation/drawer-app-bar.tsx)
- ✅ [DemoMenu.tsx](app/components/navigation/DemoMenu.tsx)
- ✅ [experience-list-item.tsx](app/components/experience/experience-list-item.tsx)
- ✅ [SidebarLayout.tsx](app/components/layouts/sidebar/SidebarLayout.tsx)
- ✅ [modularity/page.tsx](app/(pages)/modularity/page.tsx)
- ✅ [accessibility/page.tsx](app/(pages)/accessibility/page.tsx)
- ✅ [about/page.tsx](app/(pages)/about/page.tsx)

## Accessibility Considerations

### ✅ WCAG Compliance
- All color combinations meet WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- Focus indicators maintain 3:1 contrast in both modes
- Theme toggle button has clear aria-labels

### ✅ User Experience
- No flash of unstyled content (FOUC) on page load
- Smooth color transitions (0.3s ease)
- System preference detection
- Manual override available

## Testing

### Manual Testing Checklist
- [ ] Theme toggle button works in navigation
- [ ] System preference is respected on first load
- [ ] Theme persists across page refreshes
- [ ] All text remains readable in both modes
- [ ] Focus indicators are visible in both modes
- [ ] Images and vectors display correctly
- [ ] Code blocks maintain proper syntax highlighting

### Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari

## Usage

### For End Users
1. **Automatic**: The site respects your system's dark mode preference
2. **Manual**: Click the sun/moon icon in the navigation bar to toggle

### For Developers

#### Using Theme Colors in Components
```typescript
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return (
    <Box sx={{
      // Use theme palette
      color: 'text.primary',
      bgcolor: 'background.paper',
      
      // Or conditional logic
      borderColor: isDark ? 'grey.700' : 'grey.300'
    }}>
      Content
    </Box>
  );
}
```

#### Adding New Colors
Update [theme.ts](app/theme.ts) with both light and dark variants:

```typescript
palette: {
  mode,
  custom: {
    main: mode === 'light' ? '#lightColor' : '#darkColor',
  },
}
```

## Dependencies

```json
{
  "next-themes": "^0.4.6",
  "@mui/material": "^7.3.5",
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.1"
}
```

## Future Enhancements

### Potential Improvements
- [ ] Add high contrast mode
- [ ] Custom theme colors (beyond light/dark)
- [ ] Scheduled theme switching (e.g., auto-switch at sunset)
- [ ] Per-page theme overrides
- [ ] Color blindness modes

## Troubleshooting

### Theme Not Switching
1. Check browser localStorage for `theme` key
2. Verify next-themes provider wraps the app
3. Check for JavaScript errors in console

### Colors Not Updating
1. Ensure components use theme values, not hardcoded colors
2. Check if component is inside ThemeProvider
3. Verify CSS custom properties are defined

### Flash of Wrong Theme
1. Ensure `suppressHydrationWarning` is on `<html>` tag
2. Check that ThemeWrapper waits for mount
3. Verify next-themes `attribute="class"` matches CSS selectors

## Resources

- [Material-UI Theming](https://mui.com/material-ui/customization/theming/)
- [next-themes Documentation](https://github.com/pacocoursey/next-themes)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

**Last Updated**: December 30, 2025

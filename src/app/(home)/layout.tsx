import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

/**
 * The home page carries its own nav inside the hero panel (`<HeroNav>`), so the
 * sticky Fumadocs bar is switched off here. The docs layout is untouched.
 */
export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout {...baseOptions()} nav={{ enabled: false }}>
      {children}
    </HomeLayout>
  );
}

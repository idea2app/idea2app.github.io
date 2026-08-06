import { observer } from 'mobx-react';

import system from '../../models/System';
import { SymbolIcon } from '../Icon';
import { Button } from '../ui/button';

export const themeSwitchIcons = {
  light: <SymbolIcon name="light_mode" />,
  dark: <SymbolIcon name="dark_mode" />,
};

export const ColorModeIconDropdown = observer(() => (
  <Button
    type="button"
    variant="ghost"
    size="icon-sm"
    data-screenshot="toggle-mode"
    onClick={system.toggleColorScheme}
  >
    {themeSwitchIcons[system.colorScheme]}
  </Button>
));

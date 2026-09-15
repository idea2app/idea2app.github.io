import { createElement, useEffect } from 'react';

import { DefaultImage, Name, Summary } from '@/models/configuration';

export function PWAInstall() {
  useEffect(() => {
    void import('@khmyznikov/pwa-install');
  }, []);

  return createElement('pwa-install', {
    icon: DefaultImage,
    name: Name,
    description: Summary,
    'install-description': Summary,
  });
}

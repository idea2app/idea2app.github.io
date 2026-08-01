import { Project } from '@idea2app/data-server';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { FC, useContext } from 'react';

import { I18nContext } from '../../models/Translation';
import type zhCN from '../../translation/zh-CN';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

const statusTextKeys: (keyof typeof zhCN)[] = [
  'project_open', // Open
  'project_evaluated', // Evaluated
  'project_contract_generated', // ContractGenerated
  'project_in_development', // InDevelopment
  'project_in_testing', // InTesting
  'project_maintenance', // Maintenance
];

const bgColors: string[] = [
  'grey.200', // Open
  'success.light', // Evaluated
  'warning.light', // ContractGenerated
  'info.light', // InDevelopment
  'secondary.light', // InTesting
  'primary.light', // Maintenance
];

const textColors: string[] = [
  'text.primary', // Open
  'success.contrastText', // Evaluated
  'warning.contrastText', // ContractGenerated
  'info.contrastText', // InDevelopment
  'secondary.contrastText', // InTesting
  'primary.contrastText', // Maintenance
];

export const ProjectCard: FC<Project> = observer(({ id, name, status = 0 }) => {
  const { t } = useContext(I18nContext);
  const statusClass =
    status === 1
      ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200'
      : status === 2
        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
        : status === 3
          ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-200'
          : status === 4
            ? 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200'
            : status === 5
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200'
              : 'bg-muted text-muted-foreground';

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge className={statusClass}>
          {t((statusTextKeys[status] ?? 'project_open') as keyof typeof zhCN)}
        </Badge>
      </CardContent>
      <CardFooter>
        <Button asChild size="sm">
          <Link href={`/dashboard/project/${id}`}>{t('view_evaluation')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
});

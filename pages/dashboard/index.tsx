import {
  AppBar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Toolbar,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { observer } from 'mobx-react';
import { FC, useContext, useEffect } from 'react';

import { PageHead } from '../../components/PageHead';
import { SessionBox } from '../../components/User/SessionBox';
import { SymbolIcon } from '../../components/Icon';
import userStore from '../../models/User';
import { I18nContext } from '../../models/Translation';

const DashboardPage: FC = observer(() => {
  const i18n = useContext(I18nContext);
  const { t } = i18n;

  useEffect(() => {
    // Try to get current user on page load
    userStore.getCurrentUser();
  }, []);

  const menuItems = [
    { href: '/dashboard', title: '概览' },
    { href: '/dashboard/profile', title: '个人资料' },
    { href: '/dashboard/settings', title: '设置' },
  ];

  const quickActions = [
    { icon: 'person_add', title: '添加用户', description: '邀请新用户加入系统' },
    { icon: 'analytics', title: '查看统计', description: '查看系统使用情况' },
    { icon: 'notifications', title: '消息中心', description: '查看最新通知和提醒' },
    { icon: 'settings', title: '系统设置', description: '配置系统参数' },
  ];

  const recentActivities = [
    { icon: 'login', text: '用户登录', time: '2分钟前' },
    { icon: 'edit', text: '更新资料', time: '5分钟前' },
    { icon: 'security', text: '安全检查', time: '10分钟前' },
    { icon: 'backup', text: '数据备份', time: '1小时前' },
  ];

  if (!userStore.currentUser) {
    return (
      <SessionBox
        title="后台管理系统"
        path="/dashboard"
        menu={menuItems}
        jwtPayload={userStore.currentUser}
      >
        <Box className="text-center py-8">
          <Typography variant="h4" className="mb-4">
            欢迎使用后台管理系统
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-6">
            请登录以继续使用系统功能
          </Typography>
          <SymbolIcon name="security" style={{ fontSize: '4rem', color: '#1976d2' }} />
        </Box>
      </SessionBox>
    );
  }

  return (
    <>
      <PageHead title="后台管理 - Dashboard" />
      
      <AppBar position="static" className="mb-6">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            后台管理系统
          </Typography>
          <Typography variant="body2" className="mr-4">
            欢迎，{userStore.currentUser.phone}
          </Typography>
          <Button color="inherit" onClick={() => userStore.signOut()}>
            退出登录
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Welcome Section */}
          <Grid item xs={12}>
            <Card className="mb-6">
              <CardContent>
                <Typography variant="h4" className="mb-2">
                  欢迎回来！
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  今天是 {new Date().toLocaleDateString('zh-CN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    weekday: 'long'
                  })}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" className="mb-3">
              快速操作
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="flex items-center">
                      <SymbolIcon 
                        name={action.icon} 
                        className="mr-3 text-blue-500"
                        style={{ fontSize: '2rem' }}
                      />
                      <Box>
                        <Typography variant="h6" className="mb-1">
                          {action.title}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          {action.description}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Recent Activities */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" className="mb-3">
              最近活动
            </Typography>
            <Paper>
              <List>
                {recentActivities.map((activity, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <SymbolIcon name={activity.icon} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={activity.text}
                      secondary={activity.time}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Statistics Cards */}
          <Grid item xs={12}>
            <Typography variant="h5" className="mb-3">
              系统概览
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent className="text-center">
                    <SymbolIcon 
                      name="group" 
                      className="text-blue-500 mb-2"
                      style={{ fontSize: '3rem' }}
                    />
                    <Typography variant="h4" className="mb-1">
                      1,234
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      总用户数
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent className="text-center">
                    <SymbolIcon 
                      name="trending_up" 
                      className="text-green-500 mb-2"
                      style={{ fontSize: '3rem' }}
                    />
                    <Typography variant="h4" className="mb-1">
                      89
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      今日活跃
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent className="text-center">
                    <SymbolIcon 
                      name="assignment" 
                      className="text-orange-500 mb-2"
                      style={{ fontSize: '3rem' }}
                    />
                    <Typography variant="h4" className="mb-1">
                      456
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      待处理任务
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent className="text-center">
                    <SymbolIcon 
                      name="notifications" 
                      className="text-red-500 mb-2"
                      style={{ fontSize: '3rem' }}
                    />
                    <Typography variant="h4" className="mb-1">
                      12
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      新消息
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
});

export default DashboardPage;
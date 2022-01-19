import Link from 'next/link';
import { Container } from '@mui/material';
import { useStyles } from './MenuBarStyles';
import { menuItems } from './MenuItems';

export const MenuBar = ({ selected }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      {menuItems.map((item) =>
        selected === item.label ? (
          <div className={classes.selectedMenu} key={item.label}>
            <item.icon className={classes.menuIcon} />
            <Link href={item.href} passHref>
              <div>{item.label}</div>
            </Link>
          </div>
        ) : (
          <div className={classes.menu} key={item.label}>
            <item.icon className={classes.menuIcon} />
            <Link href={item.href} passHref>
              <div>{item.label}</div>
            </Link>
          </div>
        ),
      )}
    </Container>
  );
};

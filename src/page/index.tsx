import { createCell, Fragment } from 'web-cell';
import { HTMLHyperLinkProps } from 'web-utility/source/DOM-type';
import { CellRouter } from 'cell-router/source';
import { NavBar } from 'boot-cell/source/Navigator/NavBar';
import { NavLink } from 'boot-cell/source/Navigator/Nav';

import { history } from '../model';
import WebCell_0 from '../image/WebCell-0.png';

import { HomePage } from './Home';
import { OpenSourcePage } from './OpenSource';
import { CasePage } from './Case';

const menu: HTMLHyperLinkProps[] = [
    {
        title: '品质服务',
        href: '?section=services'
    },
    {
        title: '客户案例',
        href: '?section=projects'
    },
    {
        title: '菁英团队',
        href: '?section=members'
    },
    {
        title: '合作伙伴',
        href: '?section=partners'
    },
    {
        title: '开源生态',
        href: 'open-source'
    }
];

export function PageFrame() {
    return (
        <>
            <NavBar
                className="shadow-none"
                background="white"
                theme="light"
                narrow
                expand="md"
                menuAlign="end"
                fixed="top"
                brand="idea2app"
            >
                {menu.map(({ title, ...props }) => (
                    <NavLink {...props}>{title}</NavLink>
                ))}
            </NavBar>

            <CellRouter
                className="container"
                style={{ minHeight: '60vh' }}
                history={history}
                routes={[
                    { paths: [''], component: HomePage },
                    { paths: ['open-source'], component: OpenSourcePage },
                    { paths: ['case'], component: CasePage }
                ]}
            />
            <footer className="text-center py-5">
                <img
                    className="mx-1"
                    style={{ width: '2rem' }}
                    src={WebCell_0}
                />
                自豪地采用
                <a
                    className="mx-1"
                    target="_blank"
                    href="https://web-cell.dev/"
                >
                    WebCell v2
                </a>
                和
                <a
                    className="mx-1"
                    target="_blank"
                    href="https://bootstrap.web-cell.dev/"
                >
                    BootCell v1
                </a>
                开发
            </footer>
        </>
    );
}

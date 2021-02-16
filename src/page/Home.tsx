import { createCell } from 'web-cell';
import { Image } from 'boot-cell/source/Media/Image';
import { MediaObject } from 'boot-cell/source/Content/MediaObject';

import { members, partners, projects } from './data';

export const HomePage = () => (
    <main className="container-fluid">
        <section className="row my-5 py-5">
            <div classList="col-12 col-sm-6 row">
                <Image
                    className="col-8"
                    fluid
                    src="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/photos/map-1.jpg"
                />
                <div className="col-4 d-flex flex-column justify-content-between">
                    <Image
                        fluid
                        src="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/photos/map-2.jpg"
                    />
                    <Image
                        fluid
                        src="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/photos/map-3.jpg"
                    />
                </div>
            </div>
            <div classList="col-12 col-sm-6 text-center">
                <img
                    style={{ width: '10rem' }}
                    src="https://github.com/idea2app.png"
                />
                <h1>idea2app</h1>
                <h2 className="h4 text-muted">全行业信息化转型专家</h2>
                <p className="h4 mt-4">您的每个创意都值得用心实现</p>
            </div>
        </section>
        <section className="row my-5 py-5" id="services">
            <img
                className="col-12 col-sm-6 vh-100 py-5"
                src="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs//draws/simple-iphone.svg"
            />
            <ul className="col-12 col-sm-6 list-unstyled d-flex flex-column justify-content-center">
                <MediaObject
                    className="my-4"
                    listItem
                    image="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/icons/layers.svg"
                    title="业务信息化咨询"
                />
                <MediaObject
                    className="my-4"
                    listItem
                    image="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/icons/monitor.svg"
                    title="定制化软件开发"
                />
                <MediaObject
                    className="my-4"
                    listItem
                    image="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/icons/cloud.svg"
                    title="团队信息化培训"
                />
            </ul>
        </section>
        <section className="text-center my-5 py-5" id="projects">
            <h2>客户案例</h2>
            <ul className="list-unstyled row mt-5">
                {projects.map(({ preview, URL, name }) => (
                    <li className="col-12 col-sm-6 col-md-3">
                        <img src={preview} />
                        <h3 className="h5 mt-3">
                            <a
                                className="text-decoration-none text-dark stretched-link"
                                target="_blank"
                                href={URL}
                            >
                                {name}
                            </a>
                        </h3>
                    </li>
                ))}
            </ul>
        </section>
        <section className="my-5 py-5" id="members">
            <h2 className="text-center">核心成员</h2>
            <p className="text-center text-muted">
                小而美、自下而上生长的学习型团队
            </p>
            <ul className="list-unstyled row mt-5">
                {members.map(({ GitHub, name, position, summary }) => (
                    <MediaObject
                        className="col-12 col-sm-6"
                        listItem
                        image={`https://github.com/${GitHub}.png`}
                        title={name}
                    >
                        <h4 className="text-muted">{position}</h4>
                        <p className="text-muted">{summary}</p>
                    </MediaObject>
                ))}
            </ul>
        </section>
        <section className="text-center my-5 py-5" id="partners">
            <h2>合作伙伴</h2>
            <ul className="list-unstyled row mt-5">
                {partners.map(({ logo, URL, name, summary }) => (
                    <li className="col-12 col-sm-4 d-flex flex-column align-items-center">
                        <img
                            className="flex-fill w-50"
                            style={{ objectFit: 'contain' }}
                            src={logo}
                        />
                        <h3 className="h5 mt-3">
                            <a
                                className="text-decoration-none text-dark stretched-link"
                                target="_blank"
                                href={URL}
                            >
                                {name}
                            </a>
                        </h3>
                        <p className="text-muted">{summary}</p>
                    </li>
                ))}
            </ul>
        </section>
    </main>
);

import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Image from 'next/image';
import { PureComponent } from 'react';
export interface GitLogoProps {
  name: string;
  className?: string;
}

@observer
export class GitLogo extends PureComponent<GitLogoProps> {
  @observable
  accessor path = '';

  async componentDidMount() {
    const { name } = this.props;
    const topic = name.toLowerCase();

    try {
      const { src } = await this.loadImage(
        `https://raw.githubusercontent.com/github/explore/master/topics/${topic}/${topic}.png`
      );
      this.path = src;
    } catch {
      const { src } = await this.loadImage(`https://github.com/${name}.png`);

      this.path = src;
    }
  }

  loadImage(path: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new globalThis.Image();

      image.onload = () => resolve(image);
      image.onerror = reject;

      image.src = path;
    });
  }

  render() {
    const { path } = this;
    const { name, className } = this.props;

    return (
      path && <img className={`${className} object-fill`} loading="lazy" src={path} alt={name} />
    );
  }
}

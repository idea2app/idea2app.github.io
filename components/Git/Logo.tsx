import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Image from 'next/image';
import { PureComponent } from 'react';

export interface GitLogoProps extends Partial<Record<'width' | 'height', number>> {
  name: string;
  className?: string;
}

@observer
export class GitLogo extends PureComponent<GitLogoProps> {
  @observable
  accessor path = '';

  componentDidMount() {
    void this.init();
  }

  async init() {
    const { name } = this.props;
    const topic = name.toLowerCase();

    try {
      const { src } = await this.loadImage(
        `https://raw.githubusercontent.com/github/explore/master/topics/${topic}/${topic}.png`
      );

      this.path = src;
    } catch {
      const { src } = await this.loadImage(`https://github.com/${name}.png`);

      return (this.path = src);
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
    const { name, width = 24, height = 24, className = '' } = this.props;

    return (
      path && (
        <Image
          className={`${className} object-fill`}
          width={width}
          height={height}
          src={path}
          alt={name}
        />
      )
    );
  }
}

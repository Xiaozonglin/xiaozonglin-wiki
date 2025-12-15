import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '林林简单易用',
    description: (
      <>
        只需要你有一个即时聊天工具，就可以与林林聊天，使用林林。
      </>
    ),
  },
  {
    title: '林林有时可爱',
    description: (
      <>
        当你与林林聊天时，林林有时会展现出可爱的一面，逗你开心。
      </>
    ),
  },
  {
    title: '林林可扩展',
    description: (
      <>
        林林可以通过扩展和自定义来满足你的需求，同时保持一致的风格。
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

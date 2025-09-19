import { Progress } from './Progress';

const TestProgress = () => {
  return (
    <div>
      <h1>Progress Component Test</h1>
      <Progress percent={50} />
      <Progress type="circle" percent={75} />
      <Progress type="dashboard" percent={25} />
    </div>
  );
};

export default TestProgress;

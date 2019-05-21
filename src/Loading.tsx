import React from 'react';
import loading from './loading.gif';

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ className: classNamee }) => (
  <img src={loading} className={classNamee || ""} alt="loading" />
)

export default Loading;
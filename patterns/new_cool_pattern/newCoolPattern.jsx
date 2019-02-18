
import React from 'react';
const newCoolPattern = (props) => {
  return (
    <div className="entry">
      <h1>{ props.title }</h1>
      <div class="body">
        { props.body }
      </div>
    </div>
    );
};
export default newCoolPattern;

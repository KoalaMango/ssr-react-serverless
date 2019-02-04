import React from 'react';

const PatternBuilderSubmitted = (props) => {
    const link = <a href={props.prLink}>{props.prLink}</a>;
  return (
      <div>
        <h1>Successfully submitted</h1>
        <p>Thank you for your contribution. We will examine your submission and notify you if it satisfies our standards.</p>
        <p>Have a nice day UI/design/web design/sorta JS/Sorta CSS person :)</p>
          <p>You can view your PR here {link}</p>
      </div>
  );
};

export default PatternBuilderSubmitted;

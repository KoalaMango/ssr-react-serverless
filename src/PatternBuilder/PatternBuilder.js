import React from 'react';

const PatternBuilder = () => {
  return (
      <form className="pure-form pure-form-aligned" action="/pattern-submitted" method="POST">
        <fieldset>
          <div className="pure-control-group">
            <label htmlFor="name">Pattern name</label>
            <input type="text" name="name" id="name" className="pure-input-1-2" placeholder="Add pattern name here" />
          </div>

          <div className="pure-control-group">
            <label htmlFor="scss">SCSS</label>
            <textarea name="scss" id="scss" className="pure-input-1-2" placeholder="Add scss here" />
          </div>

          <div className="pure-control-group">
            <label htmlFor="js">Vanilla JS</label>
            <textarea name="js" id="js" className="pure-input-1-2" placeholder="Add Vanilla javascript here" />
          </div>

          <div className="pure-control-group">
            <label htmlFor="h_markup">Handlebars template</label>
            <textarea name="h_markup" id="h_markup" className="pure-input-1-2" placeholder="Add Handlebars template here" />
          </div>

          <button type="submit" className="pure-button pure-button-primary">Submit</button>
        </fieldset>
      </form>
  );
};

export default PatternBuilder;
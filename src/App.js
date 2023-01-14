import * as React from 'react';
import './App.css';
import data from './data';

export default function App() {
  const [input, setInput] = React.useState('');
  const [result, setResult] = React.useState('');
  const [cal, setCal] = React.useState('');
  React.useEffect(() => {
    document.title = 'Calculator';
  }, []);
  React.useEffect(() => {
    let value = 0;
    if (input.length > 18) {
      setResult('Maximum Number Exceeded');
      setInput('');
      setCal('');
    }
    if (result.includes('=') && !result.includes('AC')) {
      console.log('result here===', result);
      let replacedResut = result.split('X').join('*');
      let newResult = replacedResut.split(' ').filter(function (str) {
        return /\S/.test(str);
      });
      console.log('newResult', newResult);
      while (newResult.indexOf('/') !== -1) {
        //newResult.includes('/') not working in es2017
        newResult.forEach((item, i) => {
          if (item === '/') {
            newResult[i] = (
              parseFloat(newResult[i - 1]) / parseFloat(newResult[i + 1])
            ).toString();
            newResult.splice(i - 1, 1);
            newResult.splice(i, 1);
            console.log('newResult', newResult);
          }
        });
      }
      while (newResult.indexOf('*') !== -1) {
        newResult.forEach((item, i) => {
          if (item === '*') {
            newResult[i] = (
              parseFloat(newResult[i - 1]) * parseFloat(newResult[i + 1])
            ).toString();
            newResult.splice(i - 1, 1);
            newResult.splice(i, 1);
            console.log('newResult', newResult);
          }
        });
      }
      while (newResult.indexOf('+') !== -1) {
        newResult.forEach((item, i) => {
          if (item === '+') {
            newResult[i] = (
              parseFloat(newResult[i - 1]) + parseFloat(newResult[i + 1])
            ).toString();
            newResult.splice(i - 1, 1);
            newResult.splice(i, 1);
            console.log('newResult', newResult);
          }
        });
      }
      while (newResult.indexOf('-') !== -1) {
        newResult.forEach((item, i) => {
          if (item === '-') {
            newResult[i] = (
              parseFloat(newResult[i - 1]) - parseFloat(newResult[i + 1])
            ).toString();
            newResult.splice(i - 1, 1);
            newResult.splice(i, 1);
            console.log('newResult', newResult);
          }
        });
      }
      setCal(
        `${
          newResult[1] || newResult[0] !== 'NaN'
            ? newResult[0]
            : 'Wrong Expression'
        }`
      );
    }
    //On click AC everything will be blank
    if (result.includes('AC')) {
      setResult('');
      setInput('');
      setCal('');
    }
    //if press any other button or operation after = result and input will be blank
    if (
      result.includes('=') &&
      (!!input ||
        result.indexOf('+') > result.indexOf('=') ||
        result.indexOf('-') > result.indexOf('=') ||
        result.indexOf('*') > result.indexOf('=') ||
        result.indexOf('/') > result.indexOf('='))
    ) {
      setResult('');
      setCal('');
    }
    //First didgit need to be an Integer
    if (!result.match('[0-9]')) {
      setResult('');
    }
    //First didgit need to be an Integer for Input
    if (!input.match('[0-9]')) {
      setInput('');
    }
    //Can not write 2 oprations consecutively
    if (
      ['/', 'X', '+', '-'].indexOf(result.charAt(result.length - 1)) !== -1 &&
      ['/', 'X', '+', '-'].indexOf(result.charAt(result.length - 5)) !== -1
    ) {
      setResult(result.slice(0, result.length - 4));
    }
    //Can not have more that 2 decimal in input
    if (
      input.indexOf('.') !== input.length - 1 &&
      input.charAt(input.length - 1) === '.'
    ) {
      setInput(input.slice(0, input.length - 1));
    }
    //Can not write 2 decimal consecutively
    if (
      input.charAt(input.length - 1) === '.' &&
      input.charAt(input.length - 2) === '.'
    ) {
      setInput(input.slice(0, input.length - 1));
    }
  }, [input, result]);
  const onClickbutton = (item) => {
    // console.log('PRESSED BUTTON ==>', item);
    if (item.type === 'number' || item.name === '.') {
      setInput(input + item.name);
    } else if (item.type === 'operation' && item.name !== '.') {
      if (item.name === 'AC') {
        setResult('');
        setInput('');
        setCal('');
      }
      setResult(result + ' ' + input + ' ' + ' ' + item.name);
      setInput('');
    }
  };
  return (
    <div className="main-div">
      <div className="calc-wrapper">
        <div className="header">
          <div className="result">
            {result} {cal}
          </div>
          <div className="input">{input}</div>
        </div>
        <div className="top-buttons">
          {data &&
            data.buttons.map((button) => {
              return (
                button.position === 'top-buttons' && (
                  <button onClick={(e) => onClickbutton(button)}>
                    {button.name}
                  </button>
                )
              );
            })}
        </div>

        <div className="other-buttons">
          <div className="main-buttons">
            {data &&
              data.buttons.map((button) => {
                return (
                  button.position === 'main-buttons' && (
                    <button onClick={(e) => onClickbutton(button)}>
                      {button.name}
                    </button>
                  )
                );
              })}
          </div>
          <div className="right-buttons">
            {data &&
              data.buttons.map((button) => {
                return (
                  button.position === 'right-buttons' && (
                    <button onClick={(e) => onClickbutton(button)}>
                      {button.name}
                    </button>
                  )
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

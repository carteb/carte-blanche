import React from 'react';
import ReactDOM from 'react-dom';

import AtriumInput from './components/AtriumInput';
import Grid from './components/Grid';
import Row from './components/Grid/Row';
import LeftColumn from './components/Grid/LeftColumn';
import RightColumn from './components/Grid/RightColumn';
// import GridExperiment from './components/GridExperiment';
import styles from './styles.css';

class App extends React.Component {

  state = {
    firstValue: 'some String',
    secondValue: 'another String',
    thirdValue: 'another String',
    fourthValue: undefined,
  }

  onChangeFirstValue = ({ value }) => {
    this.setState({
      firstValue: value,
    });
  };

  onChangeSecondValue = ({ value }) => {
    this.setState({
      secondValue: value,
    });
  };

  onChangeThirdValue = ({ value }) => {
    this.setState({
      thirdValue: value,
    });
  };

  onChangeFourthValue = ({ value }) => {
    this.setState({
      fourthValue: value,
    });
  };

  render() {
    return (
      <div className={styles.root}>
        {/* <GridExperiment /> */}
        <Grid>
          <Row>
            <LeftColumn>left</LeftColumn>
            <RightColumn>right</RightColumn>
          </Row>
          <Row>
            <LeftColumn>left</LeftColumn>
            <RightColumn>right</RightColumn>
            <Row>
              <LeftColumn nestedLevel={1}>nested left</LeftColumn>
              <RightColumn>nested right</RightColumn>
            </Row>
          </Row>
          <Row>
            <LeftColumn>left</LeftColumn>
            <RightColumn>right</RightColumn>
            <Row>
              <LeftColumn nestedLevel={1}>nested left</LeftColumn>
              <RightColumn>nested right</RightColumn>
              <Row>
                <LeftColumn nestedLevel={2}>nested left 2</LeftColumn>
                <RightColumn>nested right 2</RightColumn>
              </Row>
              <Row>
                <LeftColumn nestedLevel={2}>nested left 2</LeftColumn>
                <RightColumn>nested right 2</RightColumn>
              </Row>
            </Row>
          </Row>
          <Row>
            <LeftColumn>left</LeftColumn>
            <RightColumn>right</RightColumn>
          </Row>
        </Grid>
        <AtriumInput
          value={this.state.firstValue}
          fallbackValue=""
          onChange={this.onChangeFirstValue}
        />
        <AtriumInput
          value={this.state.secondValue}
          fallbackValue=""
          onChange={this.onChangeSecondValue}
          hasSettings
        />
        <AtriumInput
          value={this.state.thirdValue}
          fallbackValue=""
          onChange={this.onChangeThirdValue}
          hasRandomButton
        />
        <AtriumInput
          value={this.state.fourthValue}
          fallbackValue=""
          onChange={this.onChangeFourthValue}
          hasRandomButton
          hasSettings
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

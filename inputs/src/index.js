import React from 'react';
import ReactDOM from 'react-dom';

import AtriumInput from '../../plugins/react/frontend/components/form/AtriumInput';
import Grid from '../../plugins/react/frontend/components/form/Grid';
import Row from '../../plugins/react/frontend/components/form/Grid/Row';
import LeftColumn from '../../plugins/react/frontend/components/form/Grid/LeftColumn';
import RightColumn from '../../plugins/react/frontend/components/form/Grid/RightColumn';
import Button from '../../plugins/react/frontend/components/form/Button';
import BooleanInput from '../../plugins/react/frontend/components/form/BooleanInput';
// import GridExperiment from './components/GridExperiment';
import styles from './styles.css';

class App extends React.Component {

  state = {
    firstValue: 'some String',
    secondValue: 'another String',
    thirdValue: 'another String',
    fourthValue: undefined,
    firstBoolean: false,
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

  onChangeFirstBoolean = ({ value }) => {
    this.setState({
      firstBoolean: value,
    });
  };

  render() {
    return (
      <div className={styles.root}>
        {/* <GridExperiment /> */}
        <Grid>
          <Row>
            <LeftColumn>left</LeftColumn>
            <RightColumn>
              <AtriumInput
                value={this.state.fourthValue}
                fallbackValue=""
                onChange={this.onChangeFourthValue}
                hasRandomButton
                hasSettings
              />
            </RightColumn>
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
                <RightColumn>
                  <AtriumInput
                    value={this.state.thirdValue}
                    fallbackValue=""
                    onChange={this.onChangeThirdValue}
                    hasRandomButton
                  />
                </RightColumn>
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
        <Button
          pressed
        >
          true
        </Button>

        <Button
          disabled
        >
          Follow Me
        </Button>

        <BooleanInput
          value
          onChange={({ value }) => { console.log(value); }}
        />
        <AtriumInput
          value={this.state.firstBoolean}
          fallbackValue
          onChange={this.onChangeFirstBoolean}
          hasSettings
          inputComponent={BooleanInput}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

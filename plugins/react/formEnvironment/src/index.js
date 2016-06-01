import React from 'react';
import ReactDOM from 'react-dom';

import CarteBlancheInput from '../../frontend/components/form/CarteBlancheInput';
import Grid from '../../frontend/components/form/Grid';
import Row from '../../frontend/components/form/Grid/Row';
import LeftColumn from '../../frontend/components/form/Grid/LeftColumn';
import RightColumn from '../../frontend/components/form/Grid/RightColumn';
import Button from '../../frontend/components/form/Button';
import BooleanInput from '../../frontend/components/form/BooleanInput';
import ComboBox from '../../frontend/components/form/ComboBox';
// import GridExperiment from './components/GridExperiment';
import IFrame from '../../frontend/components/common/IFrame';
import styles from './styles.css';

class App extends React.Component {

  state = {
    firstValue: 'some String',
    secondValue: 'another String',
    thirdValue: 'another String',
    fourthValue: undefined,
    firstBoolean: false,
    firstCheckboxValue: 3,
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

  onChangeFirstCheckboxValue = ({ value }) => {
    this.setState({
      firstCheckboxValue: value,
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
              <CarteBlancheInput
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
                  <CarteBlancheInput
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

        <IFrame />

        <ComboBox
          value={this.state.firstCheckboxValue}
          onChange={this.onChangeFirstCheckboxValue}
          options={[
            {
              value: 2,
            },
            {
              value: 3,
            },
          ]}
        />
        <CarteBlancheInput
          value={this.state.firstValue}
          fallbackValue=""
          onChange={this.onChangeFirstValue}
        />
        <CarteBlancheInput
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
          onChange={this.onChangeFirstBoolean}
        />
        <CarteBlancheInput
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

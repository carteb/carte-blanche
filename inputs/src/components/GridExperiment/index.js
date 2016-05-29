import React from 'react';
import styles from './styles.css';


/*
  <Grid>
  <LeftColumn>
    <Children />
  </LeftColumn>
  <RightColumn>
    <Children />
    <LeftColumn>
      <Children />
    </LeftColumn>
    <RightColumn>
      <Children />
    </RightColumn>
  </RightColumn>


  <Column
    left={<span>label</span>}
    right={<span>form</span>}
    rightEscaped={
      <Column
        left={<span>label</span>}
        right={<span>form</span>}
      />
    }
  />

  <Column>
    <Left><span>label</span></Left>
    <Right><span>from</span></Right>
    <Column>
      <Left><span>label</span></Left>
      <Right><span>form</span></Right>
    </Column>
  </Column>
  />
</Grid>
*/

const GridExperiment = () => (
  <div className={styles.root}>
    <div className={styles.leftPane}></div>
    <div className={styles.rightPane}></div>
    <div className={styles.form}>
      <div className={styles.prop}>
        <div className={styles.leftPart}>
          Left
        </div>
        <div className={styles.rightPart}>
          Right
        </div>
      </div>
      <div className={styles.prop}>
        <div className={styles.leftPart}>
          Left
        </div>
        <div className={styles.rightPart}>
          <div className={styles.rightChild}>
            Right
          </div>
        </div>
        <div className={styles.prop}>
          <div className={styles.leftPartNested}>
            <div className={styles.line}>&nbsp;</div>
            Nested Left
          </div>
          <div className={styles.rightPart}>
            <div className={styles.rightChild}>
              Nested Right
            </div>
          </div>
        </div>
      </div>
      <div className={styles.prop}>
        <div className={styles.leftPart}>
          Left
        </div>
        <div className={styles.rightPart}>
          <div className={styles.prop}>
            <div className={styles.leftPartNested}>
              <div className={styles.line}>&nbsp;</div>
              Nested Left
            </div>
            <div className={styles.rightPart}>
              <div className={styles.prop}>
                <div className={styles.leftPartSecondNested}>
                  <div className={styles.line}>&nbsp;</div>
                  <div className={styles.line}>&nbsp;</div>
                  Second Nested Left
                </div>
                <div className={styles.rightPart}>
                  <div className={styles.rightChild}>
                    Second Nested Right
                  </div>
                </div>
              </div>
              <div className={styles.prop}>
                <div className={styles.leftPartSecondNested}>
                  <div className={styles.line}>&nbsp;</div>
                  <div className={styles.line}>&nbsp;</div>
                  Second Nested Left
                </div>
                <div className={styles.rightPart}>
                  <div className={styles.rightChild}>
                    Second Nested Right
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.prop}>
        <div className={styles.leftPart}>
          Left
        </div>
        <div className={styles.rightPart}>
          <div className={styles.rightChild}>
            Right
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default GridExperiment;

import React from 'react';
import styles from './styles.css';

const Grid = () => (
  <div className={styles.root}>
    <div className={styles.leftPane}></div>
    <div className={styles.rightPane}></div>
    <div className={styles.form}>
      <div className={styles.prop}>
        <div className={styles.leftPart}>
          <div className={styles.leftChild}>
            Left
          </div>
        </div>
        <div className={styles.rightPart}>
          <div className={styles.rightChild}>
            Right
          </div>
        </div>
      </div>
      <div className={styles.prop}>
        <div className={styles.leftPart}>
          <div className={styles.leftChild}>
            Left
          </div>
        </div>
        <div className={styles.rightPart}>
          <div className={styles.prop}>
            <div className={styles.leftPart}>
              <div className={styles.leftChildNested}>
                Nested Left
              </div>
            </div>
            <div className={styles.rightPart}>
              <div className={styles.rightChild}>
                Nested Right
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.prop}>
        <div className={styles.leftPart}>
          <div className={styles.leftChild}>
            Left
          </div>
        </div>
        <div className={styles.rightPart}>
          <div className={styles.prop}>
            <div className={styles.leftPart}>
              <div className={styles.leftChildNested}>
                Nested Left
              </div>
            </div>
            <div className={styles.rightPart}>
              <div className={styles.prop}>
                <div className={styles.leftPart}>
                  <div className={styles.leftChildSecondNested}>
                    Second Nested Left
                  </div>
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
          <div className={styles.leftChild}>
            Left
          </div>
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

export default Grid;

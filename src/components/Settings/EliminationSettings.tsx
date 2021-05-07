import React from 'react';
import LanguageSelect from '../LanguageSelect';
interface Props {
  test?: boolean;
}

const EliminationSettings = (props: Props) => {

  return (
    <>
      <LanguageSelect />
      {props.test && <div>
        LMS TOURNAMENT OPTIONS
        </div>}
    </>
  );
}

export default EliminationSettings;
import React from 'react';
import LanguageSelect from '../LanguageSelect';
interface Props {
  test?: boolean;
}

const Settings = (props: Props) => {

  return (
    <>
      <LanguageSelect />
      {props.test && <div>
        LMS TOURNAMENT OPTIONS
        </div>}
    </>
  );
}

export default Settings;
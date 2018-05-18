function mySettings(props) {
  return (
    <Page>
         
      <Section
        title={<Text bold align="center">Month and Date Colors</Text>}>

        <ColorSelect
          label = "Month and Date"
          settingsKey="color"
          
          colors={[
            {color: 'yellow'},
            {color: 'lightsalmon'},
            {color: 'orange'},
            {color: 'red'},
            {color: 'magenta'},
            {color: 'pink'},
            {color: 'plum'},
            {color: 'violet'},
            {color: 'purple'},
            {color: 'indigo'},
            {color: 'lightskyblue'},
            {color: '#7090B5'},
            {color: '#BCD8F8'},
            {color: 'blue'},
            {color: 'deepskyblue'},
            {color: 'cyan'},
            {color: 'aqua'},
            {color: 'green'},
            {color: '#5BE37D'},
            {color: 'lime'},
            {color: '#1B2C40'},
            {color: '#394003'},
            {color: '#134022'},
            {color: 'white'},
            {color: 'lightgray'},
            {color: 'darkgray'},
            {color: '#303030'}
          ]}
          />
      
      </Section>
      
    </Page>
  );
}

registerSettingsPage(mySettings);

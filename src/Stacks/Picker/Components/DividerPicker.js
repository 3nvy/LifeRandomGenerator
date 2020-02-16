import React from 'react';
import { Card, ListItem } from 'react-native-elements';
import { View } from 'react-native';

const DividerPicker = ({ groups }) => {
    return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: "flex-start", justifyContent: "flex-start", padding: 5}}>
            { 
                groups.map((g, i) => {
                    return (
                        <Card 
                            key={i} title={g.name}
                            containerStyle={[{margin: 0}, (groups.length === i+1 && groups.length % 2 === 1) ? {width: '100%'} : {width: '50%'}]}
                        >
                            {
                                g.selections.map((item, i) => <ListItem key={`G1-${i}`} title={item.name} />)
                            }
                        </Card>
                    )
                })
            }
        </View>
    )
}

export default DividerPicker;

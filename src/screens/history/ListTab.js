import { StyleSheet, Text, View, TouchableOpacity, Image , Dimensions } from 'react-native'
import React from 'react'
import { COLORS, icons, FONTS } from '../../constants'
import { useUserContext } from '../../hooks/UserContext'

const ListTab = () => {
  return (
    <View style={styles.container}>
      {/*category items saved josbs, applied Jobs, chat activity, job previewing , job searching */}
         <View style={styles.categories}>
            <View style={styles.itemLine} >
              {/* item1 */}
               <View style={styles.item}>
                  <Image source={ icons.disk} style={[styles.saveIcon, styles.icon]}/>
                  <Text style={styles.text}>Saved Jobs</Text>
               </View>
              {/* item2 */}
              <View style={styles.item}>
                  <Image source={ icons.bag} style={[styles.appliedIcon ,styles.icon]}/>
                  <Text style={styles.text} >Jobs Applied</Text>
               </View>
            </View>
            <View style={styles.itemLine}>
               {/* item3 */}
               <View style={styles.item}>
                  <Image source={ icons.chats} style={[styles.chatIcon ,styles.icon]}/>
                  <Text style={styles.text} >Chats activity</Text>
               </View>

               {/* item4 */}
               <View style={styles.item}>
                  <Image source={ icons.find} style={[styles.searchIcon ,styles.icon]}/>
                  <Text style={styles.text}>Jobs Search</Text>
               </View>

            </View>
            <View style={styles.itemLine}>
               {/* item5 */}
               <View style={styles.item}>
                  <Image source={ icons.preview} style={[styles.previewIcon , styles.icon]}/>
                  <Text style={styles.text} >Jobs Previews</Text>
               </View>

            </View>
         </View>

         <View>
             <Text>Applied Jobs</Text>
         </View>

    </View>
  )
}

export default ListTab

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:10,
    paddingTop:5,
  },
  itemLine:{
    display:'flex',
    flexDirection:'row',
    marginBottom:10,
    gap:10,
  },
  item:{
    backgroundColor: COLORS.white,
    padding:20,
    width:'48%',
    height:60,
    borderRadius:10,
    gap: 5,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 5,
    flexDirection:'row',
    gap:10,
  },
  text:{
    ...FONTS.h4,
    color:COLORS.black,
    fontSize:14,
  },
  icon:{
     height:25,
     width:25,
  }, 
  previewIcon:{
    tintColor:'#FDB643'
  },
  searchIcon:{
    tintColor:'#B65FCF'
  },
  chatIcon:{
    tintColor:'#FC635B'
  },
  saveIcon:{
    tintColor:'#81D3E4'
  },
  appliedIcon:{
    tintColor:'#018154'
  },

  
})
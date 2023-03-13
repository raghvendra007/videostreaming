/* eslint-disable react/prop-types */
import { View, Text, TouchableOpacity, Platform, Alert, FlatList } from 'react-native';
import React from 'react';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import RNFS from 'react-native-fs';
import styles from './styles';
import {
  BlackClose,
  DollarCoinSvg,
  DownloadIcon,
  FlagIcon,
  MessageIcon,
  RightArrowAvatar,
} from '../../../../../constants/assets';
import { ACTION_SHEET_ID, SHARE_OVERLAY_SCREEN } from '../../../../../constants/strings';
import { dummyVideoLink, shareUsersData } from '../../../../../constants/dummyData';
import { shareSheetAppsData } from '../../../../../utils/constants';

const ShareOverlay = () => {
  // eslint-disable-next-line react/no-unstable-nested-components
  const NameImageView = ({ name, SVGImage, onPress }) => {
    return (
      <TouchableOpacity style={styles.nameImageContainer} onPress={onPress}>
        <Text style={styles.nameTxt}>{name}</Text>
        <SVGImage />
      </TouchableOpacity>
    );
  };

  const downloadFile = () => {
    const date = new Date();
    const randomNumber = Math.floor(date.getTime() + date.getSeconds() / 2);
    const LOCAL_PATH_TO_VIDEO =
      Platform.OS === 'ios'
        ? `${RNFS.DocumentDirectoryPath}/${SHARE_OVERLAY_SCREEN.VIDEO}${randomNumber}${SHARE_OVERLAY_SCREEN.MP4}`
        : `${RNFS.ExternalDirectoryPath}/${SHARE_OVERLAY_SCREEN.VIDEO}${randomNumber}${SHARE_OVERLAY_SCREEN.MP4}`;
    RNFS.downloadFile({
      // Todo:- Replace this dummy link with the api video link
      fromUrl: dummyVideoLink,
      toFile: LOCAL_PATH_TO_VIDEO,
      begin: (res: RNFS.DownloadBeginCallbackResult) => {},
      progress: (res: RNFS.DownloadProgressCallbackResult) => {
        //here you can calculate your progress for file download
        let progressPercent = (res.bytesWritten / res.contentLength) * 100; // to calculate in percentage
        console.log('\n\nProgress===', progressPercent);
      },
    }).promise.then((r) => {
      console.log('Done', r);
      Alert.alert('Downloaded');
    });
  };

  const renderItem = ({ item, index }) => {
    const UserPhoto = item.photo;
    return (
      <View style={styles.userCell}>
        <UserPhoto />
        <Text style={styles.usersTxt}>{item.name}</Text>
        <Text style={styles.idTxt}>{item.id}</Text>
      </View>
    );
  };

  return (
    <ActionSheet id={ACTION_SHEET_ID} containerStyle={styles.actionSheetContainer}>
      <View style={styles.container}>
        {/* Top Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.HeadingTxt}>{SHARE_OVERLAY_SCREEN.SHARE_VIDEO_TO}</Text>
          {/* Close Button */}
          <TouchableOpacity onPress={() => SheetManager.hide(`${ACTION_SHEET_ID}`)}>
            <BlackClose />
          </TouchableOpacity>
        </View>
        {/* Divider */}
        <View style={styles.separatorView} />
        {/* Dollar Text View */}
        <View style={styles.dollarTxtView}>
          <DollarCoinSvg />
          <Text style={styles.dollarCoinTxt}>{SHARE_OVERLAY_SCREEN.DOLLAR_COIN_TEXT}</Text>
        </View>
        {/* Share Users List View */}

        <View style={styles.userListView}>
          <FlatList
            data={shareUsersData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            style={styles.userList}
          />
          <View style={styles.rightArrowView}>
            <RightArrowAvatar />
            <Text style={styles.usersTxt}>More</Text>
          </View>
        </View>
        {/* Divider */}
        <View style={styles.separatorView} />
        {/* Apps Icon and Name View */}
        <View style={styles.appIconView}>
          {shareSheetAppsData.map((item) => {
            const AppIcon = item.icon;
            return (
              <TouchableOpacity>
                <AppIcon />
              </TouchableOpacity>
            );
          })}
        </View>
        {/* Bottom View */}
        <View style={styles.bottomView}>
          {/* Message */}
          <NameImageView
            name={SHARE_OVERLAY_SCREEN.MESSAGE_HERO_COSMATICS}
            SVGImage={MessageIcon}
          />
          <View style={styles.separatorView} />
          {/* Save Video */}
          <NameImageView
            name={SHARE_OVERLAY_SCREEN.SAVE_VIDEO}
            SVGImage={DownloadIcon}
            onPress={downloadFile}
          />
          <View style={styles.separatorView} />
          {/* Report Video */}
          <NameImageView name={SHARE_OVERLAY_SCREEN.REPORT_VIDEO} SVGImage={FlagIcon} />
        </View>
      </View>
    </ActionSheet>
  );
};

export default ShareOverlay;

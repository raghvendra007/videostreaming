import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import COLORS from '../../../../../constants/colors';
import {
  Body11Medium,
  BodyBold19,
  BodyRegular13,
  BodySemiBold14,
} from '../../../../../constants/fonts';

const styles = ScaledSheet.create({
  container: {
    backgroundColor: COLORS.darkBase,
    paddingBottom: moderateScale(20),
  },
  HeadingTxt: {
    color: COLORS.white,
    ...BodyBold19,
    paddingVertical: moderateScale(18.5),
    letterSpacing: -0.5,
    lineHeight: 22.8,
  },
  actionSheetContainer: {
    backgroundColor: COLORS.darkBase,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  headingContainer: {
    backgroundColor: COLORS.darkBlack,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: moderateScale(15),
  },
  nameImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(13),
    paddingLeft: moderateScale(16),
    paddingRight: moderateScale(13),
  },
  nameTxt: {
    color: COLORS.white,
    ...BodyRegular13,
    letterSpacing: -0.25,
    lineHeight: 19.5,
  },
  bottomView: {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(18),
    marginRight: moderateScale(22),
    borderRadius: moderateScale(13),
    backgroundColor: COLORS.darkElevated,
    marginBottom: moderateScale(15),
  },
  separatorView: {
    height: moderateScale(0.5),
    backgroundColor: COLORS.separatorColor,
    opacity: 0.5,
  },
  dollarTxtView: {
    flexDirection: 'row',
    marginLeft: moderateScale(15),
    marginTop: moderateScale(17),
    alignItems: 'center',
  },
  dollarCoinTxt: {
    color: COLORS.greyText,
    marginLeft: moderateScale(5),
    ...BodySemiBold14,
    letterSpacing: -0.5,
    lineHeight: 21,
  },
  appIconView: {
    flexDirection: 'row',
    marginTop: moderateScale(23),
    marginBottom: moderateScale(15),
    justifyContent: 'space-evenly',
  },
  userListView: {
    marginLeft: moderateScale(12),
    marginTop: moderateScale(11),
    marginBottom: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImageView: {
    borderRadius: 50,
    backgroundColor: 'red',
    height: 63,
    width: 63,
  },
  usersTxt: {
    color: COLORS.white,
    ...BodyRegular13,
  },
  idTxt: {
    color: COLORS.greyText,
    ...Body11Medium,
  },
  userList: {
    width: '78%',
  },
  userCell: {
    alignItems: 'center',
    marginRight: moderateScale(7),
  },
  rightArrowView: {
    marginHorizontal: moderateScale(12),
    alignItems: 'center',
  },
});

export default styles;

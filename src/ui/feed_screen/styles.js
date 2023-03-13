import { Dimensions, StyleSheet } from 'react-native';
import COLORS from '../../../constants/colors';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../../utils/constants';
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  bg_video: {
    flex: 1,
    width: DEVICE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.greyBackground,
  },
  like_text: {
    fontWeight: '500',
    color: COLORS.white,
    fontFamily: 'Rubik-Regular',
    fontSize: 11,
    bottom: DEVICE_HEIGHT * 0.415,
    lineHeight: 16.5,
    right: 7,
    textAlign: 'center',
  },
  comment_text: {
    fontWeight: '500',
    color: COLORS.white,
    fontFamily: 'Rubik-Regular',
    fontSize: 11,
    bottom: DEVICE_HEIGHT * 0.378,
    marginRight: 22,
    lineHeight: 16.5,
    right: -3,
    textAlign: 'center',
  },
  share_text: {
    fontWeight: '500',
    color: COLORS.white,
    fontFamily: 'Rubik-Regular',
    fontSize: 11,
    bottom: DEVICE_HEIGHT * 0.34,
    marginRight: 22,
    lineHeight: 16.5,
  },
  right_container: {
    position: 'absolute',
    bottom: 0,
    right: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 5,
  },
  productCard: {
    overflow: 'hidden',
    borderRadius: 10,
    width: DEVICE_WIDTH * 0.73,
    marginLeft: 12,
  },
  productCardCollapsedDetailView: {
    flex: 1,
    backgroundColor: COLORS.blackOpacityLow,
  },
  productCardTopView: { flex: 1, flexDirection: 'row' },
  brandNameText: {
    opacity: 0.75,
  },
  productNameText: {
    marginTop: 5,
  },
  productPriceText: {
    marginTop: 9.5,
    opacity: 0.8,
  },
  productCardExpandView: {
    flex: 4,
    marginBottom: 20,
  },
  productCardExpandDetailView: {
    flexDirection: 'row',
    marginTop: 13,
    marginBottom: 10,
    marginLeft: 8,
    marginRight: 20,
  },
  hotText: {
    color: COLORS.white,
    alignItems: 'center',
  },
  trendingText: {
    marginLeft: 10,
    alignItems: 'center',
  },
  scrollViewStyle: { maxHeight: 160, marginLeft: 8, marginRight: 20 },
  productCardDescriptionText: {
    marginTop: 10,
    color: COLORS.grey,
    fontFamily: 'Rubik-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
  },
  productCardCustomerLikesText: {
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 8,
    marginRight: 20,
    // color:"white"
  },
  detailsButton: {
    width: 58,
    height: 30,
    backgroundColor: COLORS.grey,
    borderRadius: 1000,
    marginTop: 15,
    marginLeft: 8,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  productCardBottomView: (isExpanded) => ({
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: isExpanded ? COLORS.black : COLORS.blackOpacityHigh,
  }),
  shareButton: {
    height: 12,
    width: 12,
    marginLeft: 12,
  },
  separator: {
    height: 20,
    width: 20,
  },
  likeButton: {
    height: 12,
    width: 14,
  },
  likeText: {
    marginLeft: 5,
  },
  addtoCartButton: {
    paddingRight: 12,
  },
  videoStyle: {
    position: 'relative',
    flex: 1,
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  accountHolder: {
    marginHorizontal: 12,
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  accountHolderImage: (firstImage) => ({
    height: firstImage ? 36 : 28,
    width: firstImage ? 36 : 28,
    marginRight: 8,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: COLORS.white,
  }),
  brandPromoOffer: {
    position: 'absolute',
    top: DEVICE_HEIGHT * 0.055,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  userProfilePhoto: {
    position: 'absolute',
    top: DEVICE_HEIGHT * 0.05,
    right: DEVICE_WIDTH * 0.04,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContainer: { flexDirection: 'row', alignItems: 'center' },
  topLinearGradient: {
    flex: 1,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
  },
  bottomLinearGradient: {
    flex: 1,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
  },
  shareBtn: {
    bottom: height * 0.35,
  },
});

export default styles;

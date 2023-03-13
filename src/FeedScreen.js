/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  LayoutAnimation,
  Pressable,
} from 'react-native';
import Video from 'react-native-video';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useIsFocused } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { SheetManager } from 'react-native-actions-sheet';
import { fetchUsers } from '../../../store/slices/userSlice';
import styles from './styles';
import StyledText from '../../components/StyledText/StyledText';
import {
  FEED_COMMENT,
  HORIZONTAL_LINE,
  PRODUCT_IMAGE,
  PRODUCT_SHARE,
  SEPARATOR,
  SHARE,
  Verified,
  LikeButton,
  UnlikeButton,
  FollowAdd,
  PROFILE_PIC,
  UnlikeWhite,
} from '../../../constants/assets';
import COLORS from '../../../constants/colors';
import { PRODUCT_DETAILS_SCREEN, COMMENTS_SCREEN, PROFILE_SCREEN } from '../../../constants/routes';
import { getVideoFeed } from '../../../store/slices/getVideoFeedSlice';
import { postFollowUser } from '../../../store/slices/postFollowUserSlice';
import { unFollowUser } from '../../../store/slices/unFollowUser';
import Status from '../../../data/services/Status';
import { postAddReaction } from '../../../store/slices/postAddReaction';
import { imageData, productCards } from '../../../constants/dummyData';
import { ACTION_SHEET_ID, FEED_SCREEN } from '../../../constants/strings';
import ShareOverlay from './components/share_overlay/ShareOverlay';
import { localVideoDataAction } from '../../../store/slices/localVideoData';

// import {SafeAreaView} from 'react-native-safe-area-context';

const widthw = Dimensions.get('window').width;
const heighth = Dimensions.get('window').height;

const FeedScreen = ({ navigation }) => {
  const [currIndex, setIndex] = useState(0);

 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  
  const videoFeedData = useSelector((state) => state.videoFeed);
  const postFollow = useSelector((state) => state.postFollow);
  const addReactionData = useSelector((state) => state.addReaction);
  const unFollowPost= useSelector((state)=>state.unFollowPost)

  const [posts, setPosts] = useState();
  const [pageSkip, setPageSkip] = useState(0);
  const localVideoData = useSelector((state) => state.localVideoData);
  const requestVideoFeedAPI = () => {
    dispatch(getVideoFeed({ limit: 1, offset: pageSkip }));
  };

  useEffect(() => {
    requestVideoFeedAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSkip]);

  useEffect(() => {
    if (videoFeedData?.loading === Status.SUCCESS) {
      setPosts(videoFeedData?.posts);
      dispatch(localVideoDataAction.setLike(videoFeedData?.response?.posts));
      dispatch(localVideoDataAction.setFollow(videoFeedData?.response?.posts));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, videoFeedData?.loading, videoFeedData?.posts]);

  const isFollowPressed = (response) => {
    const followArray = localVideoData?.follow.map((obj) => ({ ...obj }));
    const index = followArray.map((item) => item.userId).indexOf(response?.following_to_user_id);
    if (index !== -1) {
      followArray[index] = {
        ...followArray[index],
        isFollowing: true,
      };
    }
    dispatch(localVideoDataAction.followUpdate(followArray));
  };

  useEffect(() => {
    if (postFollow?.loading === Status.SUCCESS) {
      isFollowPressed(postFollow?.response);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, postFollow?.loading]);
  const isLikePressed = (response) => {
    const likeArray = localVideoData?.like.map((obj) => ({ ...obj }));
    const index = likeArray.map((item) => item.postId).indexOf(response?.post_id);

    if (index !== -1) {
      likeArray[index] = {
        postId: response?.post_id,
        isLiked: response?.is_active,
        likeCount: response?.is_active
          ? Number(likeArray[index].likeCount) + 1
          : likeArray[index].likeCount - 1,
      };
    }
    dispatch(localVideoDataAction.likeUpdate(likeArray));
  };

  useEffect(() => {
    if (addReactionData?.loading === Status.SUCCESS) {
      isLikePressed(addReactionData?.response);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addReactionData?.loading, addReactionData?.response]);

  

  const onChangeIndex = ({ index }) => {
    setIndex(index);
  };
  const onEndReached = () => {
    if (videoFeedData?.response?.count > pageSkip + 1) {
      setPageSkip(pageSkip + 1);
    } else {
      setPosts([...posts, ...posts]);
    }
  };

  return (
    <View style={styles.bg_video}>
     
      <SwiperFlatList
        vertical
        data={posts}
        pagingEnabled
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle
        renderItem={(value) => (
          <RenderItem {...value} currIndex={currIndex} navigation={navigation} />
        )}
        keyExtracter={(item, index) => index.toString()}
        onChangeIndex={onChangeIndex}
        disableintervalmomentum
        windowSize={4}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        onEndReached={onEndReached}
      />

      {
        //  ************
        //  condition to check if imageURL !== '' for placeholder image
        //  ************
        false ? (
          <TouchableOpacity
            style={styles.userProfilePhoto}
            onPress={() => {
              // TODO: navigate users to their own profile
              navigation.navigate(PROFILE_SCREEN);
            }}
          >
            <Image
              source={{ uri: 'https://picsum.photos/200' }}
              style={{
                height: 36,
                width: 36,
                borderWidth: 2,
                borderRadius: 20,
                borderColor: COLORS.white,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.userProfilePhoto}
            onPress={() => {
              // TODO: navigate users to the sign up/login flow
              navigation.navigate(PROFILE_SCREEN);
            }}
          >
            <Image
              source={PROFILE_PIC}
              style={{
                height: 36,
                width: 36,
                borderWidth: 2,
                borderRadius: 20,
                borderColor: COLORS.white,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )
      }
  
    </View>
  );
};
const RenderItem = ({ item, index, currIndex, navigation }) => {
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const screenIsFocused = useIsFocused();
  const flatListRef = useRef(null);
  const [listDataSource, setListDataSource] = useState(productCards);
  const [paused, isPaused] = useState(false);
  const [mute, setMute] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const localVideoData = useSelector((state) => state.localVideoData);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  /* ********* */
  const videoFeedData = useSelector((state) => state.videoFeed);
  const postFollow = useSelector((state) => state.postFollow);
  const unFollowPost= useSelector((state)=>state.unFollowPost)
  const addReactionData = useSelector((state) => state.addReaction);
  const findPostLike = localVideoData?.like.find((post) => post?.postId === item?.id);
  const findPostFollow = localVideoData?.follow.find((post) => post?.postId === item?.id);
  const[followUser,setFollow] =useState(false)

  console.log("find Post Follow>>>",findPostFollow)

  const onClickFollowBtn = (userId) => {

    console.log("user id>>>",userId)

    dispatch(postFollowUser({ id: userId }));
    // dispatch(unFollowUser())
  };

  const onClickLikeBtn = (post) => {
    const body = {
      // todo:- user_id should be the logged in user
      user_id: 18,
      content_type: 0,
      reaction_type: 0,
      is_active: !post?.isLiked,
      post_id: post?.postId,
    };

    dispatch(postAddReaction({ body }));
  };

  const renderProductCard = ({ item, index }) => (
    <Pressable
      style={styles.productCard}
      onPress={() => {
        flatListRef.current.scrollToIndex({
          index,
          animated: true,
        });

        const productCard = [...listDataSource];
        LayoutAnimation.configureNext(
          LayoutAnimation.create(
            300,
            LayoutAnimation.Types.easeInEaseOut,
            LayoutAnimation.Properties.opacity
          ),
          (end) => {
            setListDataSource(productCard);
          }
        );
        productCard[item.key].isExpanded = !productCard[item.key].isExpanded;
      }}
    >
      <View style={styles.productCardCollapsedDetailView}>
        <BlurView
          blurType={listDataSource[item.key].isExpanded ? 'dark' : 'chromeMaterialDark'}
          blurAmount={5}
          reducedTransparencyFallbackColor="white"
        >
          <View style={styles.productCardTopView}>
            <Image
              source={PRODUCT_IMAGE}
              style={{ height: 80, width: 80, margin: 8 }}
              resizeMode="contain"
            />
            <View style={{ marginLeft: 6, marginTop: 14, marginBottom: 2 }}>
              <StyledText mode="Body11Medium" style={styles.brandNameText}>
                Hero Cosmetics
              </StyledText>
              <StyledText mode="BodySemiBold14" style={styles.productNameText}>
                Supercharged Reset Mist
              </StyledText>
              <StyledText mode="BodySemiBold14" style={styles.productPriceText}>
                $13.99
              </StyledText>
            </View>
          </View>
          {listDataSource[item.key].isExpanded && (
            <View style={styles.productCardExpandView}>
              <Image
                style={{
                  marginTop: 5,
                  height: 1,
                  width: '100%',
                }}
                source={HORIZONTAL_LINE}
              />
              <View style={styles.productCardExpandDetailView}>
                <StyledText mode="BodySemiBold13" style={styles.hotText}>
                  {FEED_SCREEN.HOT}
                </StyledText>
                <StyledText mode="BodySemiBold13" style={styles.trendingText}>
                  {FEED_SCREEN.TRENDING}
                </StyledText>
              </View>
              <ScrollView style={styles.scrollViewStyle} alwaysBounceVertical={false}>
                {/* <View
                // onStartShouldSetResponder={() => true}

              > */}
                {/* ********* To be Deleted ********* */}
                {user.loading && <ActivityIndicator />}
                {!user.loading && user.error ? <StyledText>Error: {user.error}</StyledText> : null}
                {!user.loading && user.users.length
                  ? user.users.map((user) => <StyledText key={user.id}>{user.name}</StyledText>)
                  : null}
                {/* *********   XXXXXXX    ********* */}
                {/* </View> */}
              </ScrollView>
              <StyledText mode="BodySemiBold13" style={styles.productCardCustomerLikesText}>
                ⭐️ 92% of customers love this product
              </StyledText>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => {
                  navigation.navigate(PRODUCT_DETAILS_SCREEN);
                }}
              >
                <StyledText mode="Body12Medium" color="charcoal">
                  {FEED_SCREEN.DETAILS}
                </StyledText>
              </TouchableOpacity>
            </View>
          )}
        </BlurView>
      </View>
      <View>
        <BlurView
          style={styles.productCardBottomView(listDataSource[item.key].isExpanded)}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="white"
        >
          <View style={styles.leftContainer}>
            <TouchableOpacity style={styles.shareButton} onPress={() => {}}>
              <Image
                style={{ height: 12, width: 12 }}
                source={PRODUCT_SHARE}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Image style={styles.separator} source={SEPARATOR} resizeMode="contain" />
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => {
                setIsLiked((like) => !like);
              }}
            >
              {isLiked ? (
                <LikeButton width={14} height={12} />
              ) : (
                <UnlikeButton width={14} height={12} />
              )}
            </TouchableOpacity>
            <StyledText mode="BodyRegular13" color="grey" style={styles.likeText}>
              1.1k
            </StyledText>
            <Image
              style={{
                height: 20,
                width: 20,
              }}
              source={SEPARATOR}
              resizeMode="contain"
            />
            <StyledText mode="BodyRegular13" color="grey">{`115 ${FEED_SCREEN.BOUGHT}`}</StyledText>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <StyledText mode="BodySemiBold16" color="offWhite" style={styles.addtoCartButton}>
              {FEED_SCREEN.ADD_TO_CART}
            </StyledText>
          </TouchableOpacity>
        </BlurView>
      </View>
    </Pressable>
  );

  const onMute = (e) => {
    console.log('on mmmuuutututuut');
    setMute(!mute);
  };
  const onBuffer = (e) => {};

  const videoError = (e) => {};
  const onChangeIndex = ({ index }) => {
    setIndex(index);
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={onMute}>
        <Video
          bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
          }}
          source={{ uri: item?.s3_url }}
          // poster={item.thumb}
          onBuffer={onBuffer} // Callback when remote video is buffering
          onError={videoError}
          paused={currIndex !== index || !screenIsFocused}
          repeat
          onEnd={(e) => console.log('end', e)}
          style={styles.videoStyle}
          resizeMode="cover"
          muted={mute}
          playInBackground={false}
        />
      </TouchableWithoutFeedback>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.33)', 'rgba(0, 0, 0, 0)']}
        style={styles.topLinearGradient}
      >
        <View style={{ height: heighth * 0.2 }} />
      </LinearGradient>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.85)']}
        style={styles.bottomLinearGradient}
      >
        <View style={{ height: heighth * 0.5 }} />
      </LinearGradient>
      <View style={styles.brandPromoOffer}>
        <StyledText
          mode="BodySemiBold14"
          style={{
            lineHeight: 21,
            textShadowColor: COLORS.blackOpacityHigh,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 0,
          }}
        >
          Hero Cosmetics Promo
        </StyledText>
        <StyledText
          mode="BodyRegular14"
          style={{
            lineHeight: 21,
            textShadowColor: COLORS.blackOpacityHigh,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 0,
          }}
        >
          Free Shipping on orders $35+
        </StyledText>
      </View>
      <View style={styles.right_container}>
        <TouchableOpacity onPress={() => onClickLikeBtn(findPostLike)}>
          {findPostLike?.isLiked ? (
            <LikeButton width={28} height={23} bottom={heighth * 0.419} />
          ) : (
            <UnlikeWhite width={28} height={23} bottom={heighth * 0.419} />
          )}
        </TouchableOpacity>
        <Text style={styles.like_text}>{findPostLike?.likeCount}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(COMMENTS_SCREEN)}>
          <FEED_COMMENT width={26} height={26} bottom={heighth * 0.381} />
        </TouchableOpacity>
        <Text style={styles.comment_text}>{item?.comment_total}</Text>
        {/* Share Functionality  */}
        <TouchableOpacity
          onPress={() => SheetManager.show(`${ACTION_SHEET_ID}`)}
          style={styles.shareBtn}
        >
          <SHARE width={24} height={24} />
        </TouchableOpacity>

        <ShareOverlay />

        <Text style={styles.share_text}>670</Text>
      </View>

      <View style={{ position: 'absolute', bottom: heighth * 0.1 }}>
        {!listDataSource.find((product) => product.isExpanded) && (
          <>
            <View style={styles.accountHolder}>
              {imageData.map((image, iterator) => {
                let firstImage = false;
                if (!iterator) {
                  firstImage = true;
                }

                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(PROFILE_SCREEN);
                    }}
                    style={{
                      shadowColor: COLORS.black,
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.5,
                      shadowRadius: 5,
                    }}
                  >
                    <Image
                      key={image.key}
                      source={image.src}
                      style={styles.accountHolderImage(firstImage)}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <View
              style={{
                marginLeft: 12,
                marginBottom: 2,
                flexDirection: 'row',
              }}
            >
              <StyledText
                mode="BodySemiBold16"
                style={{
                  lineHeight: 24,
                  textShadowColor: COLORS.blackOpacityLow,
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 4,
                }}
              >
                @herocosmetics
              </StyledText>

              {item?.User?.is_verified && (
                <View style={{ marginLeft: 3, marginTop: 6 }}>
                  <Verified width={12} height={12} />
                </View>
              )}

              <TouchableOpacity
                style={{
                  marginLeft: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => onClickFollowBtn(item?.User?.id)}
              >
                <View style={{ marginLeft: 15, marginRight: 3 }}>
                  {!findPostFollow?.isFollowing && <FollowAdd width={12} height={12} />}
                </View>

                <StyledText
                  mode="Body12Medium"
                  style={{
                    lineHeight: 18,
                  }}
                >
                  {!findPostFollow?.isFollowing ? 'Follow' : 'Following'}
                </StyledText>
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 12, marginBottom: 7, width: widthw * 0.7 }}>
              <TouchableOpacity
                onPress={() => {
                  setIsTextExpanded((expanded) => !expanded);
                }}
              >
                <StyledText
                  mode="Body11Medium"
                  style={{
                    lineHeight: 16.5,
                    textShadowColor: COLORS.blackOpacityLow,
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 4,
                  }}
                  numberOfLines={isTextExpanded ? 0 : 1}
                >
                  {item?.description}
                </StyledText>
              </TouchableOpacity>
              <StyledText mode="Body11Medium">#trending #new</StyledText>
            </View>
          </>
        )}
        <FlatList
          data={productCards}
          ref={flatListRef}
          horizontal
          keyExtractor={(items) => items.key}
          showsHorizontalScrollIndicator={false}
          renderItem={renderProductCard}
          contentContainerStyle={{ alignItems: 'flex-end', flexGrow: 1 }}
        />
      </View>
    </View>
  );
};
export default FeedScreen;
FeedScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

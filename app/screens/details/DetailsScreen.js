// app/screens/details/DetailsScreen.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { getCourseDetails, toggleFavorite } from '../../store/slices/coursesSlice';
import { COLORS } from '../../constants/colors';

const { width } = Dimensions.get('window');

const DetailsScreen = ({ route, navigation }) => {
  const { courseId } = route.params;
  const dispatch = useDispatch();
  
  const { selectedCourse, isLoading, favorites } = useSelector(
    (state) => state.courses
  );
  
  const isFavorite = favorites.includes(courseId);

  useEffect(() => {
    dispatch(getCourseDetails(courseId));
  }, [courseId, dispatch]);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(courseId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return COLORS.success;
      case 'Limited':
        return '#FF9800';
      case 'Full':
        return COLORS.error;
      default:
        return COLORS.gray;
    }
  };

  if (isLoading || !selectedCourse) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading course details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Course Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: selectedCourse.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
          >
            <Feather
              name="heart"
              size={28}
              color={isFavorite ? COLORS.error : COLORS.white}
              fill={isFavorite ? COLORS.error : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.categoryBadge}>
              <Feather name="book" size={16} color={COLORS.primary} />
              <Text style={styles.categoryText}>{selectedCourse.category}</Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(selectedCourse.status) },
              ]}
            >
              <Text style={styles.statusText}>{selectedCourse.status}</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{selectedCourse.title}</Text>

          {/* Info Row */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Feather name="star" size={20} color="#FFA000" />
              <Text style={styles.infoText}>
                {selectedCourse.rating.toFixed(1)} Rating
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Feather name="users" size={20} color={COLORS.primary} />
              <Text style={styles.infoText}>{selectedCourse.stock} Seats</Text>
            </View>
            <View style={styles.infoItem}>
              <Feather name="award" size={20} color={COLORS.primary} />
              <Text style={styles.infoText}>{selectedCourse.brand}</Text>
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="file-text" size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Description</Text>
            </View>
            <Text style={styles.description}>{selectedCourse.description}</Text>
          </View>

          {/* Course Details Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="info" size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Course Details</Text>
            </View>
            
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Instructor</Text>
                <Text style={styles.detailValue}>{selectedCourse.brand}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Available Seats</Text>
                <Text style={styles.detailValue}>{selectedCourse.stock}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Category</Text>
                <Text style={styles.detailValue}>{selectedCourse.category}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Status</Text>
                <Text style={styles.detailValue}>{selectedCourse.status}</Text>
              </View>
            </View>
          </View>

          {/* Image Gallery */}
          {selectedCourse.images && selectedCourse.images.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Feather name="image" size={20} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Gallery</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.gallery}
              >
                {selectedCourse.images.map((img, index) => (
                  <Image
                    key={index}
                    source={{ uri: img }}
                    style={styles.galleryImage}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>${selectedCourse.price}</Text>
        </View>
        <TouchableOpacity style={styles.enrollButton}>
          <Feather name="check-circle" size={20} color={COLORS.white} />
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  imageContainer: {
    width: width,
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.lightGray,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    padding: 10,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginLeft: 6,
    textTransform: 'capitalize',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
    lineHeight: 32,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  description: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 24,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textTransform: 'capitalize',
  },
  gallery: {
    marginTop: 8,
  },
  galleryImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: COLORS.lightGray,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  enrollButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  enrollButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default DetailsScreen;
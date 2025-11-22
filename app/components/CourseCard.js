// app/components/CourseCard.js
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/slices/coursesSlice';
import { COLORS } from '../constants/colors';

const CourseCard = ({ course, onPress }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.courses.favorites);
  const isFavorite = favorites.includes(course.id);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(course.id));
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

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: course.image }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleToggleFavorite}
      >
        <Feather
          name={isFavorite ? 'heart' : 'heart'}
          size={24}
          color={isFavorite ? COLORS.error : COLORS.white}
          fill={isFavorite ? COLORS.error : 'transparent'}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.categoryContainer}>
            <Feather name="book" size={14} color={COLORS.primary} />
            <Text style={styles.category}>{course.category}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(course.status) },
            ]}
          >
            <Text style={styles.statusText}>{course.status}</Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {course.title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {course.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.ratingContainer}>
            <Feather name="star" size={16} color="#FFA000" />
            <Text style={styles.rating}>{course.rating.toFixed(1)}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${course.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: COLORS.lightGray,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  category: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: 4,
  },
  priceContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default CourseCard;
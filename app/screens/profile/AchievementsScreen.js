import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

const AchievementsScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [scaleAnim] = useState(new Animated.Value(1));

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first course',
      icon: 'award',
      progress: 100,
      unlocked: true,
      date: '2024-01-15',
      points: 50,
      category: 'beginner',
    },
    {
      id: 2,
      title: 'Quick Learner',
      description: 'Complete 5 courses',
      icon: 'zap',
      progress: 60,
      unlocked: false,
      currentValue: 3,
      targetValue: 5,
      points: 100,
      category: 'progress',
    },
    {
      id: 3,
      title: 'Dedicated Student',
      description: 'Study for 7 days in a row',
      icon: 'calendar',
      progress: 100,
      unlocked: true,
      date: '2024-02-20',
      points: 150,
      category: 'streak',
    },
    {
      id: 4,
      title: 'Night Owl',
      description: 'Complete a lesson after 10 PM',
      icon: 'moon',
      progress: 100,
      unlocked: true,
      date: '2024-01-28',
      points: 75,
      category: 'special',
    },
    {
      id: 5,
      title: 'Master',
      description: 'Complete 20 courses',
      icon: 'star',
      progress: 15,
      unlocked: false,
      currentValue: 3,
      targetValue: 20,
      points: 500,
      category: 'progress',
    },
    {
      id: 6,
      title: 'Social Butterfly',
      description: 'Share 10 courses with friends',
      icon: 'share-2',
      progress: 30,
      unlocked: false,
      currentValue: 3,
      targetValue: 10,
      points: 200,
      category: 'social',
    },
    {
      id: 7,
      title: 'Perfect Score',
      description: 'Get 100% on a quiz',
      icon: 'check-circle',
      progress: 100,
      unlocked: true,
      date: '2024-02-10',
      points: 100,
      category: 'achievement',
    },
    {
      id: 8,
      title: 'Early Bird',
      description: 'Complete a lesson before 7 AM',
      icon: 'sunrise',
      progress: 0,
      unlocked: false,
      points: 75,
      category: 'special',
    },
  ];

  const stats = {
    totalPoints: 475,
    unlockedAchievements: achievements.filter(a => a.unlocked).length,
    totalAchievements: achievements.length,
    level: 5,
    nextLevelPoints: 500,
  };

  const filterAchievements = () => {
    if (selectedTab === 'all') return achievements;
    if (selectedTab === 'unlocked') return achievements.filter(a => a.unlocked);
    if (selectedTab === 'locked') return achievements.filter(a => !a.unlocked);
    return achievements;
  };

  const animatePress = (achievement) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const AchievementCard = ({ achievement }) => (
    <TouchableOpacity
      style={[
        styles.achievementCard,
        !achievement.unlocked && styles.lockedCard,
      ]}
      onPress={() => animatePress(achievement)}
      activeOpacity={0.8}
    >
      <View style={styles.achievementHeader}>
        <View
          style={[
            styles.iconContainer,
            achievement.unlocked
              ? styles.unlockedIcon
              : styles.lockedIcon,
          ]}
        >
          <Feather
            name={achievement.icon}
            size={32}
            color={achievement.unlocked ? COLORS.primary : COLORS.gray}
          />
        </View>
        <View style={styles.achievementInfo}>
          <Text
            style={[
              styles.achievementTitle,
              !achievement.unlocked && styles.lockedText,
            ]}
          >
            {achievement.title}
          </Text>
          <Text style={styles.achievementDescription}>
            {achievement.description}
          </Text>
          {achievement.unlocked && achievement.date && (
            <Text style={styles.dateText}>
              Unlocked: {new Date(achievement.date).toLocaleDateString()}
            </Text>
          )}
        </View>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>{achievement.points}</Text>
          <Text style={styles.pointsLabel}>pts</Text>
        </View>
      </View>

      {!achievement.unlocked && achievement.currentValue !== undefined && (
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${achievement.progress}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {achievement.currentValue} / {achievement.targetValue}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Stats Header */}
      <View style={styles.statsHeader}>
        <View style={styles.levelContainer}>
          <Text style={styles.levelLabel}>Level</Text>
          <Text style={styles.levelNumber}>{stats.level}</Text>
        </View>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {stats.unlockedAchievements}/{stats.totalAchievements}
            </Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalPoints}</Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>
        </View>
      </View>

      {/* Progress to Next Level */}
      <View style={styles.levelProgress}>
        <Text style={styles.progressTitle}>Progress to Level {stats.level + 1}</Text>
        <View style={styles.levelProgressBar}>
          <View
            style={[
              styles.levelProgressFill,
              { width: `${(stats.totalPoints / stats.nextLevelPoints) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.levelProgressText}>
          {stats.totalPoints} / {stats.nextLevelPoints} points
        </Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'all' && styles.activeTab]}
          onPress={() => setSelectedTab('all')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'all' && styles.activeTabText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'unlocked' && styles.activeTab]}
          onPress={() => setSelectedTab('unlocked')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'unlocked' && styles.activeTabText,
            ]}
          >
            Unlocked
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'locked' && styles.activeTab]}
          onPress={() => setSelectedTab('locked')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'locked' && styles.activeTabText,
            ]}
          >
            Locked
          </Text>
        </TouchableOpacity>
      </View>

      {/* Achievements List */}
      <ScrollView
        style={styles.achievementsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.achievementsContent}
      >
        {filterAchievements().map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statsHeader: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  levelContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  levelLabel: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  levelNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  statsGrid: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.9,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.white,
    opacity: 0.3,
    marginHorizontal: 15,
  },
  levelProgress: {
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  levelProgressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  levelProgressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  levelProgressText: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray,
  },
  activeTabText: {
    color: COLORS.white,
  },
  achievementsList: {
    flex: 1,
    marginTop: 15,
  },
  achievementsContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  achievementCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lockedCard: {
    opacity: 0.7,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  unlockedIcon: {
    backgroundColor: '#E8F5E9',
  },
  lockedIcon: {
    backgroundColor: '#f5f5f5',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  lockedText: {
    color: COLORS.gray,
  },
  achievementDescription: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 2,
  },
  dateText: {
    fontSize: 11,
    color: COLORS.primary,
    marginTop: 4,
  },
  pointsBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  pointsLabel: {
    fontSize: 10,
    color: '#FF9800',
  },
  progressSection: {
    marginTop: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'right',
  },
});

export default AchievementsScreen;
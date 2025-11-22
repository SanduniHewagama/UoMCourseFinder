// app/screens/profile/HelpAndSupportScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

const HelpAndSupportScreen = ({ navigation }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');

  // FAQ Data
  const faqs = [
    {
      id: 1,
      question: 'How do I enroll in a course?',
      answer: 'To enroll in a course, browse the courses from the home screen, tap on a course you\'re interested in, and click the "Enroll Now" button on the course details page.',
    },
    {
      id: 2,
      question: 'Can I download courses for offline viewing?',
      answer: 'Yes! You can download course videos for offline viewing. Just tap the download icon on any video lesson. Make sure you have enough storage space on your device.',
    },
    {
      id: 3,
      question: 'How do I track my progress?',
      answer: 'Your progress is automatically tracked as you complete lessons. You can view your overall progress on your profile page and individual course progress on each course page.',
    },
    {
      id: 4,
      question: 'What are achievements and how do I earn them?',
      answer: 'Achievements are badges you earn by completing specific tasks like finishing courses, maintaining study streaks, or getting perfect quiz scores. Check the Achievements page to see all available badges.',
    },
    {
      id: 5,
      question: 'How do I reset my password?',
      answer: 'Go to Settings > Account > Change Password. You can also use the "Forgot Password" link on the login screen if you\'re logged out.',
    },
    {
      id: 6,
      question: 'Can I access courses on multiple devices?',
      answer: 'Yes! Your account syncs across all devices. Just log in with the same credentials on any device to access your courses and progress.',
    },
  ];

  // Contact Options
  const contactOptions = [
    {
      id: 1,
      icon: 'mail',
      title: 'Email Support',
      subtitle: 'support@skillup.com',
      action: () => {
        Linking.openURL('mailto:support@skillup.com');
      },
    },
    {
      id: 2,
      icon: 'phone',
      title: 'Call Us',
      subtitle: '+1 (555) 123-4567',
      action: () => {
        Linking.openURL('tel:+15551234567');
      },
    },
    {
      id: 3,
      icon: 'message-circle',
      title: 'Live Chat',
      subtitle: 'Chat with our support team',
      action: () => {
        Alert.alert('Live Chat', 'Live chat feature coming soon!');
      },
    },
    {
      id: 4,
      icon: 'globe',
      title: 'Visit Website',
      subtitle: 'www.skillup.com/help',
      action: () => {
        Linking.openURL('https://www.skillup.com/help');
      },
    },
  ];

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleSendFeedback = () => {
    if (!feedbackText.trim()) {
      Alert.alert('Error', 'Please enter your feedback');
      return;
    }

    Alert.alert(
      'Thank You!',
      'Your feedback has been submitted successfully. We\'ll get back to you soon!',
      [
        {
          text: 'OK',
          onPress: () => setFeedbackText(''),
        },
      ]
    );
  };

  const FAQItem = ({ faq }) => (
    <TouchableOpacity
      style={styles.faqItem}
      onPress={() => toggleFAQ(faq.id)}
      activeOpacity={0.7}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{faq.question}</Text>
        <Feather
          name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={COLORS.gray}
        />
      </View>
      {expandedFAQ === faq.id && (
        <Text style={styles.faqAnswer}>{faq.answer}</Text>
      )}
    </TouchableOpacity>
  );

  const ContactOption = ({ option }) => (
    <TouchableOpacity
      style={styles.contactOption}
      onPress={option.action}
      activeOpacity={0.7}
    >
      <View style={styles.contactIconContainer}>
        <Feather name={option.icon} size={24} color={COLORS.primary} />
      </View>
      <View style={styles.contactText}>
        <Text style={styles.contactTitle}>{option.title}</Text>
        <Text style={styles.contactSubtitle}>{option.subtitle}</Text>
      </View>
      <Feather name="chevron-right" size={20} color={COLORS.gray} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Feather name="help-circle" size={48} color={COLORS.primary} />
        <Text style={styles.headerTitle}>How can we help you?</Text>
        <Text style={styles.headerSubtitle}>
          Find answers to common questions or contact our support team
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => Alert.alert('Tutorials', 'Video tutorials coming soon!')}
          >
            <View style={styles.quickActionIcon}>
              <Feather name="play-circle" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.quickActionText}>Tutorials</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => Alert.alert('User Guide', 'User guide coming soon!')}
          >
            <View style={styles.quickActionIcon}>
              <Feather name="book-open" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.quickActionText}>User Guide</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => Alert.alert('Community', 'Community forum coming soon!')}
          >
            <View style={styles.quickActionIcon}>
              <Feather name="users" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.quickActionText}>Community</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => Alert.alert('Report', 'Report issue form coming soon!')}
          >
            <View style={styles.quickActionIcon}>
              <Feather name="flag" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.quickActionText}>Report Issue</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FAQs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqContainer}>
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </View>
      </View>

      {/* Contact Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Support</Text>
        <View style={styles.contactContainer}>
          {contactOptions.map((option) => (
            <ContactOption key={option.id} option={option} />
          ))}
        </View>
      </View>

      {/* Feedback Form */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Send Us Feedback</Text>
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackLabel}>
            We'd love to hear your thoughts, suggestions, or concerns
          </Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Type your feedback here..."
            placeholderTextColor={COLORS.gray}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={feedbackText}
            onChangeText={setFeedbackText}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSendFeedback}
          >
            <Feather name="send" size={18} color={COLORS.white} />
            <Text style={styles.submitButtonText}>Send Feedback</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Need immediate assistance? Our support team is available 24/7
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  faqContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  faqItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 10,
    lineHeight: 20,
  },
  contactContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contactText: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  contactSubtitle: {
    fontSize: 13,
    color: COLORS.gray,
  },
  feedbackContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  feedbackLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 12,
  },
  feedbackInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#333',
    minHeight: 120,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  footerText: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default HelpAndSupportScreen;
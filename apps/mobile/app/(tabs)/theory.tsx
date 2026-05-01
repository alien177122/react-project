import { THEORY_CONCEPTS } from '@training/shared/data/theory';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { tokens } from '@/theme/tokens';

export default function TheoryScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={THEORY_CONCEPTS}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>Theory</Text>
            <Text style={styles.title}>Теория</Text>
            <Text style={styles.subtitle}>
              Первый native-перенос длинного web-контента: вместо DOM-секций — читаемые карточки
              в FlatList.
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.index}>{String(index + 1).padStart(2, '0')}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardBody}>{item.body}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: tokens.colors.bg,
  },
  content: {
    padding: tokens.spacing.md,
    paddingBottom: tokens.spacing.xxl,
    gap: tokens.spacing.sm,
  },
  hero: {
    gap: tokens.spacing.sm,
    marginBottom: tokens.spacing.md,
    paddingTop: tokens.spacing.md,
  },
  eyebrow: {
    color: tokens.colors.accent,
    fontSize: tokens.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.xxl,
    fontWeight: '600',
    lineHeight: 38,
  },
  subtitle: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.md,
    lineHeight: 24,
  },
  card: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    gap: tokens.spacing.sm,
    padding: tokens.spacing.md,
  },
  index: {
    color: tokens.colors.accent,
    fontSize: tokens.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.6,
  },
  cardTitle: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.lg,
    fontWeight: '600',
    lineHeight: 26,
  },
  cardBody: {
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.sm,
    lineHeight: 21,
  },
});

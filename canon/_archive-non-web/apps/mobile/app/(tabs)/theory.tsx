import {THEORY_CONCEPTS} from '@training/shared/data/theory';
import {useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {THEORY_CHAPTERS, THEORY_READING_ARTICLES, type TheoryChapter} from '@/data/theoryChapters';
import {tokens} from '@/theme/tokens';

export default function TheoryScreen() {
  const [chapterId, setChapterId] = useState<string | null>(null);
  const index = [...THEORY_CHAPTERS, ...THEORY_READING_ARTICLES];
  const active = index.find(chapter => chapter.id === chapterId) ?? null;

  if (active) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <FlatList
          data={THEORY_CONCEPTS}
          keyExtractor={item => item.title}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <View style={styles.stack}>
              <View style={styles.hero}>
                <Text style={styles.eyebrow}>
                  {active.kind === 'reading' ? 'Интересная статья' : `Теория · ${active.num}`}
                </Text>
                <Text style={styles.title}>{active.title}</Text>
                <Text style={styles.subtitle}>{active.summary}</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={() => setChapterId(null)}
                style={({pressed}) => [styles.ghostButton, pressed && styles.pressed]}>
                <Text style={styles.ghostText}>
                  {active.kind === 'reading' ? '← Все темы' : '← Все главы'}
                </Text>
              </Pressable>
            </View>
          }
          renderItem={({item}) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <FlatList
        data={THEORY_CHAPTERS}
        keyExtractor={(item: TheoryChapter) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.stack}>
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>Теория</Text>
              <Text style={styles.title}>Главы</Text>
              <Text style={styles.subtitle}>
                10 глав без carousel и RevealTimeline — только текст для быстрой работы.
              </Text>
            </View>
          </View>
        }
        renderItem={({item}) => (
          <Pressable
            accessibilityRole="button"
            onPress={() => setChapterId(item.id)}
            style={({pressed}) => [styles.card, pressed && styles.pressed]}>
            <Text style={styles.num}>{item.num}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.body}>{item.summary}</Text>
          </Pressable>
        )}
        ListFooterComponent={
          <View style={styles.stack}>
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>Чтение</Text>
              <Text style={styles.cardTitle}>Интересные статьи для чтения</Text>
              <Text style={styles.body}>Клинические разборы вне учебной сетки 10 глав.</Text>
            </View>
            {THEORY_READING_ARTICLES.map(item => (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                onPress={() => setChapterId(item.id)}
                style={({pressed}) => [styles.card, pressed && styles.pressed]}>
                <Text style={styles.num}>{item.num}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.body}>{item.summary}</Text>
              </Pressable>
            ))}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: tokens.colors.bg},
  content: {padding: tokens.spacing.md, paddingBottom: tokens.spacing.xxl, gap: tokens.spacing.sm},
  stack: {gap: tokens.spacing.md, marginBottom: tokens.spacing.sm},
  hero: {gap: tokens.spacing.sm, paddingTop: tokens.spacing.sm},
  eyebrow: {
    color: tokens.colors.accent,
    fontSize: tokens.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {color: tokens.colors.text, fontSize: tokens.fontSize.xxl, fontWeight: '600'},
  subtitle: {color: tokens.colors.textSecondary, fontSize: tokens.fontSize.md, lineHeight: 24},
  card: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    gap: tokens.spacing.sm,
    padding: tokens.spacing.md,
  },
  num: {
    color: tokens.colors.accent,
    fontSize: tokens.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.6,
  },
  cardTitle: {color: tokens.colors.text, fontSize: tokens.fontSize.lg, fontWeight: '600'},
  body: {color: tokens.colors.textSecondary, fontSize: tokens.fontSize.md, lineHeight: 24},
  ghostButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: tokens.spacing.md,
  },
  ghostText: {color: tokens.colors.text, fontSize: tokens.fontSize.sm, fontWeight: '500'},
  pressed: {opacity: 0.9, transform: [{scale: 0.98}]},
});

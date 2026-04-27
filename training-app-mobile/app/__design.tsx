import { Redirect } from 'expo-router'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme, WEB_TOKEN_PARITY } from '../src/theme/tokens'

export default function DesignSystemScreen() {
  if (!__DEV__) {
    return <Redirect href="/" />
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>WEB_TOKEN_PARITY</Text>
          {Object.entries(WEB_TOKEN_PARITY).map(([name, value]) => (
            <TokenRow key={name} name={name} value={value} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Radius</Text>
          {Object.entries(theme.radius).map(([name, value]) => (
            <View key={name} style={styles.row}>
              <Text style={styles.tokenName}>{name}</Text>
              <Text style={styles.tokenValue}>{value}px</Text>
              <View style={[styles.radiusPreview, { borderRadius: value }]} />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Typography</Text>
          {Object.entries(theme.typography).map(([name, value]) => (
            <Text key={name} style={[styles.typeSample, { fontSize: value }]}>
              {name} ({value}px) - The quick brown fox
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function TokenRow({ name, value }: { name: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.tokenName}>{name}</Text>
      <Text numberOfLines={1} style={styles.tokenValue}>
        {value}
      </Text>
      <View style={[styles.swatch, { backgroundColor: value }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.bg,
    flex: 1,
  },
  content: {
    paddingBottom: theme.spacing.xl,
  },
  section: {
    borderBottomColor: theme.colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    color: theme.colors.muted,
    fontSize: theme.typography.data,
    fontWeight: '700',
    letterSpacing: theme.letterSpacing.caps,
    marginBottom: theme.spacing.md,
    textTransform: 'uppercase',
  },
  row: {
    alignItems: 'center',
    columnGap: theme.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
  },
  tokenName: {
    color: theme.colors.text,
    flex: 1,
    fontSize: theme.typography.small,
  },
  tokenValue: {
    color: theme.colors.muted,
    flex: 1.2,
    fontSize: theme.typography.caption,
  },
  swatch: {
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    height: 32,
    width: 32,
  },
  radiusPreview: {
    backgroundColor: theme.colors.surface2,
    borderColor: theme.colors.border,
    borderWidth: 1,
    height: 32,
    width: 48,
  },
  typeSample: {
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
})

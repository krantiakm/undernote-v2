import { redirect } from 'next/navigation';

export default function LegacyDataRedirect() {
  redirect('/me/vault');
}

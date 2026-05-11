import React from 'react';
import { Avatar } from '../../shared/Avatar';

export function MetaRow({ author, posted, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Avatar name={author.initials} size={32} color={accent} shape="soft" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="f-body" style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>{author.name}</div>
        <div className="f-mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {author.tag} · {posted} ago
        </div>
      </div>
    </div>
  );
}

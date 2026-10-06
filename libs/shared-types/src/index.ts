/**
 * Naisei Shared Domain & Protocol Types
 */

export type PaperType = 'lined' | 'blank' | 'dotted';

export type SyncStatus = 'saved' | 'saving' | 'offline' | 'conflict';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Journal {
  id: string; // Client-generated UUIDv7
  userId: string;
  title: string;
  description?: string;
  coverColor?: string;
  defaultPaperType: PaperType;
  clientCreatedAt: string;
  clientUpdatedAt: string;
  serverUpdatedAt?: string;
  revision: number;
  isDeleted: boolean;
}

export interface PageBlockContent {
  type: string;
  attrs?: Record<string, unknown>;
  content?: PageBlockContent[];
  text?: string;
  marks?: Array<{
    type: string;
    attrs?: Record<string, unknown>;
  }>;
}

export interface PageDocument {
  type: 'doc';
  content?: PageBlockContent[];
}

export interface JournalPage {
  id: string; // Client-generated UUIDv7
  journalId: string;
  userId: string;
  title: string;
  content: PageDocument; // ProseMirror / Tiptap structured JSON document
  paperType: PaperType;
  pageNumber: number;
  entryDate: string; // YYYY-MM-DD
  isFavorite: boolean;
  tags: string[];
  clientCreatedAt: string;
  clientUpdatedAt: string;
  serverUpdatedAt?: string;
  revision: number;
  isDeleted: boolean;
}

export interface Tag {
  id: string;
  userId: string;
  name: string;
  color?: string;
  clientCreatedAt: string;
  clientUpdatedAt: string;
  serverUpdatedAt?: string;
  revision: number;
  isDeleted: boolean;
}

export interface SyncPushBatch {
  clientId: string;
  journals: Journal[];
  pages: JournalPage[];
  tags: Tag[];
}

export interface SyncPushResponse {
  processedRevisions: Record<string, number>;
  serverCursor: string;
  conflicts: Array<{
    entityId: string;
    entityType: 'journal' | 'page' | 'tag';
    serverRevision: number;
    clientRevision: number;
  }>;
}

export interface SyncPullRequest {
  sinceCursor?: string;
}

export interface SyncPullResponse {
  journals: Journal[];
  pages: JournalPage[];
  tags: Tag[];
  serverCursor: string;
}

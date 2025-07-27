import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Token, TokenGroup, TokenCategory, TokenType } from '@/types/token';
import { generateTokenName } from '@/utils/tokenValidation';

interface TokenStore {
  tokens: Token[];
  groups: TokenGroup[];
  selectedToken: Token | null;
  
  // Actions
  addToken: (token: Omit<Token, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateToken: (id: string, updates: Partial<Token>) => void;
  deleteToken: (id: string) => void;
  selectToken: (token: Token | null) => void;
  
  // Group actions
  addGroup: (name: string, category: TokenCategory) => void;
  updateGroup: (id: string, updates: Partial<TokenGroup>) => void;
  deleteGroup: (id: string) => void;
  moveTokenToGroup: (tokenId: string, groupId: string) => void;
  
  // Bulk actions
  importTokens: (tokens: Token[]) => void;
  clearAllTokens: () => void;
  
  // Getters
  getTokensByCategory: (category: TokenCategory) => Token[];
  getTokensByType: (type: TokenType) => Token[];
  getGroupById: (id: string) => TokenGroup | undefined;
}

export const useTokenStore = create<TokenStore>()(
  persist(
    (set, get) => ({
      tokens: [],
      groups: [],
      selectedToken: null,

      addToken: (tokenData) => {
        const newToken: Token = {
          ...tokenData,
          id: crypto.randomUUID(),
          name: tokenData.name || generateTokenName(tokenData.category, tokenData.type, tokenData.value),
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Token;

        set((state) => ({
          tokens: [...state.tokens, newToken],
        }));
      },

      updateToken: (id, updates) => {
        set((state) => ({
          tokens: state.tokens.map((token) =>
            token.id === id
              ? { ...token, ...updates, updatedAt: new Date() }
              : token
          ),
        }));
      },

      deleteToken: (id) => {
        set((state) => ({
          tokens: state.tokens.filter((token) => token.id !== id),
          selectedToken: state.selectedToken?.id === id ? null : state.selectedToken,
          groups: state.groups.map((group) => ({
            ...group,
            tokens: group.tokens.filter((token) => token.id !== id),
          })),
        }));
      },

      selectToken: (token) => {
        set({ selectedToken: token });
      },

      addGroup: (name, category) => {
        const newGroup: TokenGroup = {
          id: crypto.randomUUID(),
          name,
          category,
          tokens: [],
          collapsed: false,
        };

        set((state) => ({
          groups: [...state.groups, newGroup],
        }));
      },

      updateGroup: (id, updates) => {
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === id ? { ...group, ...updates } : group
          ),
        }));
      },

      deleteGroup: (id) => {
        set((state) => ({
          groups: state.groups.filter((group) => group.id !== id),
        }));
      },

      moveTokenToGroup: (tokenId, groupId) => {
        const { tokens, groups } = get();
        const token = tokens.find((t) => t.id === tokenId);
        
        if (!token) return;

        set((state) => ({
          groups: state.groups.map((group) => {
            if (group.id === groupId) {
              return {
                ...group,
                tokens: [...group.tokens.filter((t) => t.id !== tokenId), token],
              };
            } else {
              return {
                ...group,
                tokens: group.tokens.filter((t) => t.id !== tokenId),
              };
            }
          }),
        }));
      },

      importTokens: (tokens) => {
        set((state) => ({
          tokens: [...state.tokens, ...tokens],
        }));
      },

      clearAllTokens: () => {
        set({
          tokens: [],
          groups: [],
          selectedToken: null,
        });
      },

      getTokensByCategory: (category) => {
        return get().tokens.filter((token) => token.category === category);
      },

      getTokensByType: (type) => {
        return get().tokens.filter((token) => token.type === type);
      },

      getGroupById: (id) => {
        return get().groups.find((group) => group.id === id);
      },
    }),
    {
      name: 'design-token-studio',
      version: 1,
    }
  )
);
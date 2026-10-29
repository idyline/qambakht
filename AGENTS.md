<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules

- All binary assets (covers, portrait, manuscripts, gallery art) are served from
  the Lovable CDN via `.asset.json` pointers in `src/assets/` — code uses the
  pointer's `url` field. This keeps images and PDFs working identically on every
  host (Lovable preview, Vercel, anywhere); do not move binaries back into the repo.

<script lang="ts">
  import type { Picture, Project, Team } from '@prisma/client';
  import ProjectList from './projectList.svelte';
  import TeamList from './teamList.svelte';

  export let projects: (Project & { logo: Picture })[] | undefined | null;
  export let teams:
    | (Team & {
        _count: {
          members: number;
        };
      })[]
    | undefined
    | null;
</script>

<div class="h-full card m-2 p-4">
  <ProjectList data={projects} />
  <br />
  <hr class="!border-t-4" />
  <br />
  <TeamList data={teams} />
</div>

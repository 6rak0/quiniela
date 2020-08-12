<script>
  import { user } from "../stores";
</script>

<div class="container">
  <div class="section">
    <p>{$user.username}</p>
    <p>{$user._id}</p>
    <p>{$user.isAdmin}</p>
  </div>
</div>

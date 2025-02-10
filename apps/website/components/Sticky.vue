<script setup lang="ts">
import PerfectScrollbar from 'perfect-sticky-scrollbar'
import { onMounted, useTemplateRef } from 'vue'
import 'perfect-sticky-scrollbar/style.css'

const dom0 = useTemplateRef('dom0')
const dom1 = useTemplateRef('dom1')

onMounted(() => {
  const ps0 = new PerfectScrollbar(dom0.value!, {
    stickyXScrollbar: true,
    stickyXScrollbarOffset: 40,
  })

  const ps1 = new PerfectScrollbar(dom1.value!, {
    stickyYScrollbar: true,
    stickyYScrollbarOffset: 10,
  })
  console.log(ps0, ps1)
})
</script>

<template>
  <div class="container mx-auto p-16 gap-10 grid">
    <div class="flex gap-10">
      <div ref="dom0" class="bg-gray-200 rounded relative w-[600px]">
        <!-- EXAMPLE CONTENT -->
        <div class="content p-5 w-[1280px]">
          <h2 class="font-weight-bold text-center ">
            Hello I'm a piece of example content!
          </h2>
          <p class="lead mb-3 text-center ">
            You can just scroll trough me and marvel at the perfection of this scrollbar,
            but
            I'm also full of surprises!
          </p>

          <section class="my-4">
            <hr>
            <div class="row mt-3 justify-content-center">
              <div class="col-3 d-flex">
                <!-- Card -->
                <div class="card">
                  <!-- Card image -->
                  <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img
                      class="img-fluid" src="https://mdbootstrap.com/wp-content/uploads/2018/10/mdb_news_1.jpg"
                      alt="Card image cap"
                    >
                    <a href="#!">
                      <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);" />
                    </a>
                  </div>

                  <!-- Card content -->
                  <div class="card-body">
                    <!-- Title -->
                    <h4 class="card-title">
                      I'm a pretty card
                    </h4>
                    <!-- Text -->
                    <p class="card-text">
                      I'm very pretty and I have a pretty blue button, but it contains nothing, only
                      animated waves. I'm a sad,
                      pretty card.
                    </p>
                    <!-- Button -->
                    <a href="#" class="btn btn-primary mt-4">Button</a>
                  </div>
                </div>
              <!-- Card -->
              </div>
              <div class="col-3 d-flex">
                <!-- Card -->
                <div class="card">
                  <!-- Card image -->
                  <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img
                      class="card-img-top" src="https://mdbootstrap.com/wp-content/uploads/2018/10/tutorials.jpg"
                      alt="Card image cap"
                    >
                    <a href="#!">
                      <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);" />
                    </a>
                  </div>

                  <!-- Card content -->
                  <div class="card-body">
                    <!-- Title -->
                    <h4 class="card-title">
                      I'm also pretty
                    </h4>
                    <!-- Text -->
                    <p class="card-text">
                      I'm very pretty and I have a pretty purple button, it contains a link to a
                      <strong>Web design & Web development tutorials</strong>. I'm a happy,
                      pretty card.
                    </p>
                    <!-- Button -->
                    <a
                      href="https://mdbootstrap.com/docs/standard/getting-started/"
                      class="btn btn-secondary"
                    >Tutorial</a>
                  </div>
                </div>
              <!-- Card -->
              </div>
              <div class="col-3 d-flex">
                <!-- Card -->
                <div class="card">
                  <!-- Card image -->
                  <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img
                      class="card-img-top" src="https://mdbootstrap.com/wp-content/uploads/2018/10/admin.jpg"
                      alt="Card image cap"
                    >
                    <a href="#!">
                      <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);" />
                    </a>
                  </div>

                  <!-- Card content -->
                  <div class="card-body">
                    <!-- Title -->
                    <h4 class="card-title">
                      I'm also happy
                    </h4>
                    <!-- Text -->
                    <p class="card-text">
                      I'm very pretty and I have a pretty mdb-color button. It' leads to <strong>Admin
                        Dashboard building tutorial</strong>. I'm a happy,
                      pretty card.
                    </p>
                    <!-- Button -->
                    <a
                      href="https://www.youtube.com/watch?v=Ro1x0zYUwwA&list=PLl1gkwYU90QlfX9oIJvC4JJKaucei7Hx8&index=12&ab_channel=Keepcoding"
                      class="btn btn-info mt-4"
                    >Tutorial</a>
                  </div>
                </div>
              <!-- Card -->
              </div>
              <div class="col-3 d-flex">
                <!-- Card -->
                <div class="card">
                  <!-- Card image -->
                  <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img
                      class="card-img-top"
                      src="https://mdbootstrap.com/wp-content/themes/mdbootstrap4/content/en/_mdb5/standard/pro/_main/assets/mdb5-about-v2.jpg"
                      alt="Card image cap"
                    >
                    <a href="#!">
                      <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);" />
                    </a>
                  </div>

                  <!-- Card content -->
                  <div class="card-body">
                    <!-- Title -->
                    <h4 class="card-title font-weight-bold">
                      I made y'all
                    </h4>
                    <!-- Text -->
                    <p class="card-text">
                      I'm very pretty and my button let's you download a <strong>free UI Kit</strong>
                      with
                      pretty, happy cards & over 700+ of other material components!
                    </p>
                    <!-- Button -->
                    <a
                      href="https://mdbootstrap.com/docs/standard/getting-started/installation/?utm_campaign=PS&utm_source=Package"
                      class="btn btn-success mt-1"
                    ><i class="fas fa-download mr-2" /> Download</a>
                  </div>
                </div>
              <!-- Card -->
              </div>
            </div>
          </section>

          <section class="my-4 text-center">
            <hr>
            <h3>We are beautiful and colorful</h3>
            <p class="lead mb-3">
              We are some material scrollbars that could help you make your apps and projects even more
              perfect!
            </p>
            <a
              href="https://mdbootstrap.com/docs/standard/methods/scrollbar/?utm_campaign=PS&utm_source=Package"
              class="btn btn-sm btn-primary rounded"
            >Learn
              more about us!</a>
            <div class="row mt-3 justify-content-center">
              <div class="scrollbar scrollbar-primary">
                <div class="force-overflow" />
              </div>
              <div class="scrollbar scrollbar-secondary">
                <div class="force-overflow" />
              </div>
              <div class="scrollbar scrollbar-default">
                <div class="force-overflow" />
              </div>
              <div class="scrollbar scrollbar-info">
                <div class="force-overflow" />
              </div>
              <div class="scrollbar scrollbar-success">
                <div class="force-overflow" />
              </div>
              <div class="scrollbar scrollbar-warning">
                <div class="force-overflow" />
              </div>
            </div>
          </section>

          <section class="my-4 text-center">
            <hr>
            <h3>I'm a picture of a boar</h3>
            <p class="lead mb-3">
              That's enough for me.
            </p>
            <div class="row mt-3 justify-content-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/01/Sus_scrofa_cristatus.jpg"
                class="img-fluid shadow-5" alt="1" style="width: 26rem;"
              >
            </div>
          </section>

          <section class="my-4 text-center">
            <hr>
            <h3>I'm a basic Material Design sign-up form</h3>
            <p class="lead mb-3">
              Click on my button to learn more about me!
            </p>
            <div class="row mt-3 justify-content-center">
              <!-- Default form register -->
              <form class="border border-light shadow-5 py-4 px-4" style="width: 26rem;">
                <!-- 2 column grid layout with text inputs for the first and last names -->
                <div class="row mb-4">
                  <p class="h4 mb-4">
                    Sign Up
                  </p>
                  <div class="col">
                    <div class="form-outline">
                      <input id="form3Example1" type="text" class="form-control">
                      <label class="form-label" for="form3Example1">First name</label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-outline">
                      <input id="form3Example2" type="text" class="form-control">
                      <label class="form-label" for="form3Example2">Last name</label>
                    </div>
                  </div>
                </div>

                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input id="form3Example3" type="email" class="form-control">
                  <label class="form-label" for="form3Example3">Email address</label>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input id="form3Example4" type="password" class="form-control">
                  <label class="form-label" for="form3Example4">Password</label>
                </div>

                <!-- Number input -->
                <div class="form-outline mb-4">
                  <input id="form6Example6" type="number" class="form-control">
                  <label class="form-label" for="form6Example6">Phone</label>
                </div>

                <!-- Checkbox -->
                <div class="form-check d-flex justify-content-center mb-4">
                  <input id="form2Example33" class="form-check-input me-2" type="checkbox" value="" checked>
                  <label class="form-check-label" for="form2Example33">
                    Subscribe to our newsletter
                  </label>
                </div>

                <!-- Submit button -->
                <button type="submit" class="btn btn-primary btn-block mb-4">
                  Sign up
                </button>

                <!-- Register buttons -->
                <div class="text-center">
                  <p>or sign up with:</p>
                  <button type="button" class="btn btn-primary btn-floating mx-1">
                    <i class="fab fa-facebook-f" />
                  </button>

                  <button type="button" class="btn btn-primary btn-floating mx-1">
                    <i class="fab fa-google" />
                  </button>

                  <button type="button" class="btn btn-primary btn-floating mx-1">
                    <i class="fab fa-twitter" />
                  </button>

                  <button type="button" class="btn btn-primary btn-floating mx-1">
                    <i class="fab fa-github" />
                  </button>
                </div>
                <hr>
                <!-- Terms of service -->
                <p>
                  By clicking
                  <em>Sign up</em> you agree to our
                  <a href="" target="_blank">terms of service</a>
                </p>
              </form>
            <!-- Default form register -->
            </div>
          </section>

          <section class="my-4 text-center">
            <hr>
            <h3>We are leading Web Development technologies</h3>
            <p class="lead mb-3">
              Click on us if you're interested about learning more or getting our beautiful components
              for free.
            </p>
            <div class="row mt-3 justify-content-center">
              <div class="col-md-3">
                <!-- Card -->
                <div
                  class="card bg-image"
                  style="background-image: url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg);"
                >
                  <!-- Content -->
                  <div
                    class="text-white text-center d-flex align-items-center py-5 px-4"
                    style="background-color: rgba(0, 0, 0, 0.6)"
                  >
                    <div>
                      <a href="https://mdbootstrap.com/docs/standard/?utm_campaign=PS&utm_source=Package"><img
                        src="https://mdbootstrap.com/img/Marketing/general/logo/small/bootstrap.png"
                      ></a>
                      <h3 class="card-title pt-2 font-weight-bold">
                        <strong>Standard</strong>
                      </h3>
                      <p>Get beautiful components and useful features by clicking the button below.</p>
                      <a
                        href="https://mdbootstrap.com/docs/standard/?utm_campaign=PS&utm_source=Package"
                        class="btn btn-secondary"
                      ><i class="fas fa-clone left" /> Learn more</a>
                    </div>
                  </div>
                </div>
              <!-- Card -->
              </div>
              <div class="col-md-3">
                <!-- Card -->
                <div
                  class="card bg-image"
                  style="background-image: url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg);"
                >
                  <!-- Content -->
                  <div
                    class="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4"
                    style="background-color: rgba(0, 0, 0, 0.6)"
                  >
                    <div>
                      <a href="https://mdbootstrap.com/docs/b5/angular/?utm_campaign=PS&utm_source=Package"><img
                        src="https://mdbootstrap.com/img/Marketing/general/logo/small/angular.png"
                      ></a>
                      <h3 class="card-title pt-2 font-weight-bold">
                        <strong>Angular</strong>
                      </h3>
                      <p>Get beautiful components and useful features by clicking the button below.</p>
                      <a
                        href="https://mdbootstrap.com/docs/b5/angular/?utm_campaign=PS&utm_source=Package"
                        class="btn btn-danger"
                      ><i class="fas fa-clone left md-1" /> Learn more</a>
                    </div>
                  </div>
                </div>
              <!-- Card -->
              </div>
              <div class="col-md-3">
                <!-- Card -->
                <div
                  class="card bg-image"
                  style="background-image: url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg);"
                >
                  <!-- Content -->
                  <div
                    class="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4"
                    style="background-color: rgba(0, 0, 0, 0.6)"
                  >
                    <div>
                      <a href="https://mdbootstrap.com/docs/b5/react/?utm_campaign=PS&utm_source=Package"><img
                        src="https://mdbootstrap.com/img/Marketing/general/logo/small/react.png"
                      ></a>
                      <h3 class="card-title pt-2 font-weight-bold">
                        <strong>React</strong>
                      </h3>
                      <p>Get beautiful components and useful features by clicking the button below.</p>
                      <a
                        href="https://mdbootstrap.com/docs/b5/react/?utm_campaign=PS&utm_source=Package"
                        class="btn btn-info"
                      ><i class="fas fa-clone left me-1" />Learn more</a>
                    </div>
                  </div>
                </div>
              <!-- Card -->
              </div>
              <div class="col-md-3">
                <!-- Card -->
                <div
                  class="card bg-image"
                  style="background-image: url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg);"
                >
                  <!-- Content -->
                  <div
                    class="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4"
                    style="background-color: rgba(0, 0, 0, 0.6)"
                  >
                    <div>
                      <a href="https://mdbootstrap.com/docs/b5/vue/?utm_campaign=PS&utm_source=Package"><img
                        src="https://mdbootstrap.com/img/Marketing/general/logo/small/vue.png"
                      ></a>
                      <h3 class="card-title pt-2 font-weight-bold">
                        <strong>Vue</strong>
                      </h3>
                      <p>Get beautiful components and useful features by clicking the button below.</p>
                      <a
                        href="https://mdbootstrap.com/docs/b5/vue/?utm_campaign=PS&utm_source=Package"
                        class="btn btn-success"
                      ><i class="fas fa-clone left me-1" />Learn more</a>
                    </div>
                  </div>
                </div>
              <!-- Card -->
              </div>
            </div>
          </section>

          <section class="my-4 text-center">
            <hr>
            <h3>I'm saying goodbye!</h3>
            <p class="lead mb-3">
              Beeing scrolled by you was a pleasure, I hope I'll see you soon at <a
                href="https://mdbootstrap.com/?utm_campaign=PS&utm_source=Package"
              >mdbootstrap.com</a>
            </p>
          </section>
        </div>
      <!-- EXAMPLE CONTENT -->
      </div>
      <div class="bg-gray-500 px-8">
        <div class="text-white rounded-lg bg-red-300">
          粘性元素
        </div>
      </div>
    </div>

    <div ref="dom1" class="bg-gray-200 rounded relative w-[130vw] h-[500px]">
      <!-- EXAMPLE CONTENT -->
      <div class="content p-5 h-[3000px]">
        <h2 class="font-weight-bold text-center ">
          Hello I'm a piece of example content!
        </h2>
        <p class="lead mb-3 text-center ">
          You can just scroll trough me and marvel at the perfection of this scrollbar,
          but
          I'm also full of surprises!
        </p>

        <section class="my-4">
          <hr>
          <div class="row mt-3 justify-content-center">
            <div class="col-3 d-flex">
              <!-- Card -->
              <div class="card">
                <!-- Card image -->
                <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img
                    class="img-fluid" src="https://mdbootstrap.com/wp-content/uploads/2018/10/mdb_news_1.jpg"
                    alt="Card image cap"
                  >
                  <a href="#!">
                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);" />
                  </a>
                </div>

                <!-- Card content -->
                <div class="card-body">
                  <!-- Title -->
                  <h4 class="card-title">
                    I'm a pretty card
                  </h4>
                  <!-- Text -->
                  <p class="card-text">
                    I'm very pretty and I have a pretty blue button, but it contains nothing, only
                    animated waves. I'm a sad,
                    pretty card.
                  </p>
                  <!-- Button -->
                  <a href="#" class="btn btn-primary mt-4">Button</a>
                </div>
              </div>
              <!-- Card -->
            </div>
            <div class="col-3 d-flex">
              <!-- Card -->
              <div class="card">
                <!-- Card image -->
                <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img
                    class="card-img-top" src="https://mdbootstrap.com/wp-content/uploads/2018/10/tutorials.jpg"
                    alt="Card image cap"
                  >
                  <a href="#!">
                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);" />
                  </a>
                </div>

                <!-- Card content -->
                <div class="card-body">
                  <!-- Title -->
                  <h4 class="card-title">
                    I'm also pretty
                  </h4>
                  <!-- Text -->
                  <p class="card-text">
                    I'm very pretty and I have a pretty purple button, it contains a link to a
                    <strong>Web design & Web development tutorials</strong>. I'm a happy,
                    pretty card.
                  </p>
                  <!-- Button -->
                  <a
                    href="https://mdbootstrap.com/docs/standard/getting-started/"
                    class="btn btn-secondary"
                  >Tutorial</a>
                </div>
              </div>
              <!-- Card -->
            </div>
            <div class="col-3 d-flex">
              <!-- Card -->
              <div class="card">
                <!-- Card image -->
                <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img
                    class="card-img-top" src="https://mdbootstrap.com/wp-content/uploads/2018/10/admin.jpg"
                    alt="Card image cap"
                  >
                  <a href="#!">
                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);" />
                  </a>
                </div>

                <!-- Card content -->
                <div class="card-body">
                  <!-- Title -->
                  <h4 class="card-title">
                    I'm also happy
                  </h4>
                  <!-- Text -->
                  <p class="card-text">
                    I'm very pretty and I have a pretty mdb-color button. It' leads to <strong>Admin
                      Dashboard building tutorial</strong>. I'm a happy,
                    pretty card.
                  </p>
                  <!-- Button -->
                  <a
                    href="https://www.youtube.com/watch?v=Ro1x0zYUwwA&list=PLl1gkwYU90QlfX9oIJvC4JJKaucei7Hx8&index=12&ab_channel=Keepcoding"
                    class="btn btn-info mt-4"
                  >Tutorial</a>
                </div>
              </div>
              <!-- Card -->
            </div>
            <div class="col-3 d-flex">
              <!-- Card -->
              <div class="card">
                <!-- Card image -->
                <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img
                    class="card-img-top"
                    src="https://mdbootstrap.com/wp-content/themes/mdbootstrap4/content/en/_mdb5/standard/pro/_main/assets/mdb5-about-v2.jpg"
                    alt="Card image cap"
                  >
                  <a href="#!">
                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);" />
                  </a>
                </div>

                <!-- Card content -->
                <div class="card-body">
                  <!-- Title -->
                  <h4 class="card-title font-weight-bold">
                    I made y'all
                  </h4>
                  <!-- Text -->
                  <p class="card-text">
                    I'm very pretty and my button let's you download a <strong>free UI Kit</strong>
                    with
                    pretty, happy cards & over 700+ of other material components!
                  </p>
                  <!-- Button -->
                  <a
                    href="https://mdbootstrap.com/docs/standard/getting-started/installation/?utm_campaign=PS&utm_source=Package"
                    class="btn btn-success mt-1"
                  ><i class="fas fa-download mr-2" /> Download</a>
                </div>
              </div>
              <!-- Card -->
            </div>
          </div>
        </section>

        <section class="my-4 text-center">
          <hr>
          <h3>We are beautiful and colorful</h3>
          <p class="lead mb-3">
            We are some material scrollbars that could help you make your apps and projects even more
            perfect!
          </p>
          <a
            href="https://mdbootstrap.com/docs/standard/methods/scrollbar/?utm_campaign=PS&utm_source=Package"
            class="btn btn-sm btn-primary rounded"
          >Learn
            more about us!</a>
          <div class="row mt-3 justify-content-center">
            <div class="scrollbar scrollbar-primary">
              <div class="force-overflow" />
            </div>
            <div class="scrollbar scrollbar-secondary">
              <div class="force-overflow" />
            </div>
            <div class="scrollbar scrollbar-default">
              <div class="force-overflow" />
            </div>
            <div class="scrollbar scrollbar-info">
              <div class="force-overflow" />
            </div>
            <div class="scrollbar scrollbar-success">
              <div class="force-overflow" />
            </div>
            <div class="scrollbar scrollbar-warning">
              <div class="force-overflow" />
            </div>
          </div>
        </section>

        <section class="my-4 text-center">
          <hr>
          <h3>I'm a picture of a boar</h3>
          <p class="lead mb-3">
            That's enough for me.
          </p>
          <div class="row mt-3 justify-content-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/01/Sus_scrofa_cristatus.jpg"
              class="img-fluid shadow-5" alt="1" style="width: 26rem;"
            >
          </div>
        </section>

        <section class="my-4 text-center">
          <hr>
          <h3>I'm a basic Material Design sign-up form</h3>
          <p class="lead mb-3">
            Click on my button to learn more about me!
          </p>
          <div class="row mt-3 justify-content-center">
            <!-- Default form register -->
            <form class="border border-light shadow-5 py-4 px-4" style="width: 26rem;">
              <!-- 2 column grid layout with text inputs for the first and last names -->
              <div class="row mb-4">
                <p class="h4 mb-4">
                  Sign Up
                </p>
                <div class="col">
                  <div class="form-outline">
                    <input id="form3Example1" type="text" class="form-control">
                    <label class="form-label" for="form3Example1">First name</label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-outline">
                    <input id="form3Example2" type="text" class="form-control">
                    <label class="form-label" for="form3Example2">Last name</label>
                  </div>
                </div>
              </div>

              <!-- Email input -->
              <div class="form-outline mb-4">
                <input id="form3Example3" type="email" class="form-control">
                <label class="form-label" for="form3Example3">Email address</label>
              </div>

              <!-- Password input -->
              <div class="form-outline mb-4">
                <input id="form3Example4" type="password" class="form-control">
                <label class="form-label" for="form3Example4">Password</label>
              </div>

              <!-- Number input -->
              <div class="form-outline mb-4">
                <input id="form6Example6" type="number" class="form-control">
                <label class="form-label" for="form6Example6">Phone</label>
              </div>

              <!-- Checkbox -->
              <div class="form-check d-flex justify-content-center mb-4">
                <input id="form2Example33" class="form-check-input me-2" type="checkbox" value="" checked>
                <label class="form-check-label" for="form2Example33">
                  Subscribe to our newsletter
                </label>
              </div>

              <!-- Submit button -->
              <button type="submit" class="btn btn-primary btn-block mb-4">
                Sign up
              </button>

              <!-- Register buttons -->
              <div class="text-center">
                <p>or sign up with:</p>
                <button type="button" class="btn btn-primary btn-floating mx-1">
                  <i class="fab fa-facebook-f" />
                </button>

                <button type="button" class="btn btn-primary btn-floating mx-1">
                  <i class="fab fa-google" />
                </button>

                <button type="button" class="btn btn-primary btn-floating mx-1">
                  <i class="fab fa-twitter" />
                </button>

                <button type="button" class="btn btn-primary btn-floating mx-1">
                  <i class="fab fa-github" />
                </button>
              </div>
              <hr>
              <!-- Terms of service -->
              <p>
                By clicking
                <em>Sign up</em> you agree to our
                <a href="" target="_blank">terms of service</a>
              </p>
            </form>
            <!-- Default form register -->
          </div>
        </section>

        <section class="my-4 text-center">
          <hr>
          <h3>We are leading Web Development technologies</h3>
          <p class="lead mb-3">
            Click on us if you're interested about learning more or getting our beautiful components
            for free.
          </p>
          <div class="row mt-3 justify-content-center">
            <div class="col-md-3">
              <!-- Card -->
              <div
                class="card bg-image"
                style="background-image: url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg);"
              >
                <!-- Content -->
                <div
                  class="text-white text-center d-flex align-items-center py-5 px-4"
                  style="background-color: rgba(0, 0, 0, 0.6)"
                >
                  <div>
                    <a href="https://mdbootstrap.com/docs/standard/?utm_campaign=PS&utm_source=Package"><img
                      src="https://mdbootstrap.com/img/Marketing/general/logo/small/bootstrap.png"
                    ></a>
                    <h3 class="card-title pt-2 font-weight-bold">
                      <strong>Standard</strong>
                    </h3>
                    <p>Get beautiful components and useful features by clicking the button below.</p>
                    <a
                      href="https://mdbootstrap.com/docs/standard/?utm_campaign=PS&utm_source=Package"
                      class="btn btn-secondary"
                    ><i class="fas fa-clone left" /> Learn more</a>
                  </div>
                </div>
              </div>
              <!-- Card -->
            </div>
            <div class="col-md-3">
              <!-- Card -->
              <div
                class="card bg-image"
                style="background-image: url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg);"
              >
                <!-- Content -->
                <div
                  class="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4"
                  style="background-color: rgba(0, 0, 0, 0.6)"
                >
                  <div>
                    <a href="https://mdbootstrap.com/docs/b5/angular/?utm_campaign=PS&utm_source=Package"><img
                      src="https://mdbootstrap.com/img/Marketing/general/logo/small/angular.png"
                    ></a>
                    <h3 class="card-title pt-2 font-weight-bold">
                      <strong>Angular</strong>
                    </h3>
                    <p>Get beautiful components and useful features by clicking the button below.</p>
                    <a
                      href="https://mdbootstrap.com/docs/b5/angular/?utm_campaign=PS&utm_source=Package"
                      class="btn btn-danger"
                    ><i class="fas fa-clone left md-1" /> Learn more</a>
                  </div>
                </div>
              </div>
              <!-- Card -->
            </div>
            <div class="col-md-3">
              <!-- Card -->
              <div
                class="card bg-image"
                style="background-image: url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg);"
              >
                <!-- Content -->
                <div
                  class="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4"
                  style="background-color: rgba(0, 0, 0, 0.6)"
                >
                  <div>
                    <a href="https://mdbootstrap.com/docs/b5/react/?utm_campaign=PS&utm_source=Package"><img
                      src="https://mdbootstrap.com/img/Marketing/general/logo/small/react.png"
                    ></a>
                    <h3 class="card-title pt-2 font-weight-bold">
                      <strong>React</strong>
                    </h3>
                    <p>Get beautiful components and useful features by clicking the button below.</p>
                    <a
                      href="https://mdbootstrap.com/docs/b5/react/?utm_campaign=PS&utm_source=Package"
                      class="btn btn-info"
                    ><i class="fas fa-clone left me-1" />Learn more</a>
                  </div>
                </div>
              </div>
              <!-- Card -->
            </div>
            <div class="col-md-3">
              <!-- Card -->
              <div
                class="card bg-image"
                style="background-image: url(https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2814%29.jpg);"
              >
                <!-- Content -->
                <div
                  class="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4"
                  style="background-color: rgba(0, 0, 0, 0.6)"
                >
                  <div>
                    <a href="https://mdbootstrap.com/docs/b5/vue/?utm_campaign=PS&utm_source=Package"><img
                      src="https://mdbootstrap.com/img/Marketing/general/logo/small/vue.png"
                    ></a>
                    <h3 class="card-title pt-2 font-weight-bold">
                      <strong>Vue</strong>
                    </h3>
                    <p>Get beautiful components and useful features by clicking the button below.</p>
                    <a
                      href="https://mdbootstrap.com/docs/b5/vue/?utm_campaign=PS&utm_source=Package"
                      class="btn btn-success"
                    ><i class="fas fa-clone left me-1" />Learn more</a>
                  </div>
                </div>
              </div>
              <!-- Card -->
            </div>
          </div>
        </section>

        <section class="my-4 text-center">
          <hr>
          <h3>I'm saying goodbye!</h3>
          <p class="lead mb-3">
            Beeing scrolled by you was a pleasure, I hope I'll see you soon at <a
              href="https://mdbootstrap.com/?utm_campaign=PS&utm_source=Package"
            >mdbootstrap.com</a>
          </p>
        </section>
      </div>
      <!-- EXAMPLE CONTENT -->
    </div>
  </div>
</template>

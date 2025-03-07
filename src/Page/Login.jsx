import React from 'react'
import logo from '../Component/image/rupplogo.png';

const Login = () => {
  return (
    <div class="flex flex-col w-full  overflow-hidden relative min-h-screen radial-gradient items-center justify-center g-0 px-4">
        <div class="justify-center items-center w-full card lg:flex max-w-md ">
            <div class=" w-full card-body">
                    <a href="../" class="py-4 block"><img src={logo} alt="" class="mx-auto h-32 w-32"/></a>
                    <p class="mb-4 text-gray-500 text-lg font-semibold text-center">Department Management Information System</p>
                <form>

                    <div class="mb-4">
                        <label for="forUsername"
                        class="block text-sm font-semibold mb-2 text-gray-600">Username</label>
                    <input type="text" id="forUsername"
                        class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-600 focus:ring-0 " aria-describedby="hs-input-helper-text"/>
                    </div>

                    <div class="mb-6">
                        <label for="forPassword"
                        class="block text-sm font-semibold mb-2 text-gray-600">Password</label>
                    <input type="password" id="forPassword"
                        class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-600 focus:ring-0 " aria-describedby="hs-input-helper-text"/>
                    </div>

                        <div class="flex justify-between">
                        <div class="flex">
                            <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded-[4px] text-blue-600 focus:ring-blue-500 " id="hs-default-checkbox"/>
                            <label for="hs-default-checkbox" class="text-sm text-gray-600 ms-3">Remeber this Device</label>
                            </div>

                        </div>

                        <div class="grid my-6">
                            <a href="../" class="btn py-[10px] text-base text-white font-medium hover:bg-blue-700">Sign In</a>
                        </div>
                </form>
            </div>
    </div>
	</div>
  )
}

export default Login
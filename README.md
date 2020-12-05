# Description

Demonstrate how to synchronize latest data between device and server.

Among the many synchronizing ways in the world, this way is one of them.

Using timestamp makes efficient synchronizing that decrease traffic, time and resource usage.

# Components

## `Center`

`Center` is the middle of other points.

Every components request data to `Center`.

`Center` have to be running before other components to be on.

When other components request change of the data, 

`Center` changes the data and update the timestamp at that time.

So, the timestamp represent the last updated time.

Components are check the changes of the data with the simple timestamp.


## `A` and `B`

When these components turned on, request currently latest data to `Center`.

`Center` response latest data and the timestamp when updated.

After then, these components don't need to request all the data before it changed.

So, components starts polling that request the timestamp,

and compare `Center's` with `Component's`.

If it is same, they don't ask data 

or it's different, they request updated data to `Center`.

Therefore, components keep maintain the latest data with the polling for timestamp.
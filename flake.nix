{
  inputs = {
    dreampkgs.url = "github:nix-community/dreampkgs";
  };
  outputs = {nixpkgs, dreampkgs, ...}: let
    system = "x86_64-linux";
    lib = nixpkgs.lib;
    pkgs = import nixpkgs {
      inherit system;
      config.allowUnfree = true;
    };
  in {
    devShells.${system}.default = pkgs.mkShell {
      buildInputs = [
        dreampkgs.packages.${system}.gpt-engineer
        pkgs.nodejs
        pkgs.jdk
        pkgs.androidenv.androidPkgs_9_0.platform-tools
      ];
      shellHook = ''
        # gpt-engineer won't run otherwise
        # TODO: wrap gpte instead as this interferes with vscode
        export NODE_OPTIONS=--openssl-legacy-provider
        # source .env file if it exists
        if [ -f .env ]; then
          source .env
        fi
      '';
    };
  };
}
